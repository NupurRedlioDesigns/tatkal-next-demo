import { secureAccess } from '@/utils/Apiconfig';
import cookie from 'cookie'
export default async function handler(req, res) {


    if (req.method === 'POST') {
        const { email, password } = req.body

        // const user = await users.findOne({ email });

        const userData = {
            id: 'user_id123',
            email: "john@doe.com",
            password: "123"
        }
        let user = userData.email == email ? userData : "";
        let token;
        if (user) {
            token = user.id;
        }
        else {
            return res.json({ message: 'User not found' })
        }

        if (user) {
            if (password === user.password) {
                user.role = "user";
                return res.status(200).json(user)
            }
        }


        return res.json({ message: 'incorrect email or password', success: false })

    }
}
