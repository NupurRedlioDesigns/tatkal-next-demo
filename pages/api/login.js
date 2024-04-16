import { secureAccess } from '@/utils/Apiconfig';
import { getUsers } from '../../utils/mongodb'
import cookie from 'cookie'
export default async function handler(req, res) {

    const users = await getUsers();
    const access = secureAccess(req, res)

    if (req.method === 'POST') {
        const { email, password } = req.body

        const user = await users.findOne({ email });
        let token;
        if (user) {
            token = user._id.toString();
        }
        else {
            return res.json({ message: 'User not found' })
        }


        res.setHeader(
            'Set-Cookie',
            cookie.serialize('token', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                path: '/',
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
            })
        )
        if (user) {
            if (password === user.password) {
                await users.updateOne(
                    { _id: user._id },
                    { $set: { last_login: new Date() } }
                );
                user.role = "user";
                return res.status(200).json(user)
            }
        }


        return res.json({ message: 'incorrect email or password', success: false })

    }
}
