import NextAuth from "next-auth";
import jwt from "jsonwebtoken";
import Credentials from "next-auth/providers/credentials";
import { instance } from "@/utils/Apiconfig";

const options = {
    providers: [
        Credentials({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials;
                const data = await authenticateUser(email, password, req.headers.origin);
                if (data) {
                    const token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET, { expiresIn: "10s" });
                    return data;
                } else {
                    return null;
                }
            },
        }),
    ],
    pages: { signIn: '/auth/SignIn' },
    session: { jwt: true, maxAge: 10 },
    jwt: { secret: process.env.JWT_SECRET, maxAge: 10 },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.email = user.email;
                token.id = user._id;
            }
            return token;
        },
        session: async ({ session, token, user }) => {
            if (token) {
                session.user.email = token.email;
                session.user.id = token.id;
            }
            return session;
        },
    },
};


export default (req, res) => NextAuth(req, res, options);

async function authenticateUser(email, password, url) {
    const { data } = await instance.post(`${url}/api/login`, { email, password });
    if (data.email === email && data.password === password) {
        delete data.password;
        return data;
    } else {
        return null;
    }
}