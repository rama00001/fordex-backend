import express from "express";
const router = express.Router();
import { User_info } from '../schemas/user_schema.js';
import Bcrypt from "bcryptjs";


const register = async (req, res) => {
    try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const mobile_number = req.body.mobile_number;
        const user_id = `${uuidv4()}-${req.body.first_name}-${req.body.last_name}`
        const isActive = req.body.isActive;
        const password = Bcrypt.hashSync(req.body.password, 10);
        const user = new User_info({
            first_name, last_name, email,mobile_number, user_id, isActive, password
        });

        const result = await user.save()
        console.log(result);
        res.json(result);

    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

router.post('/user/signup', (req, res) => register(req, res))


export default router;