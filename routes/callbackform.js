import express from "express";
const router = express.Router();
import { Customer_Info } from '../schemas/customer_schema.js';
import cors from 'cors';


const customerAdd = async (req, res) => {
    try {
        const customer = new Customer_Info({
            city: req.body.city,
            comments: req.body.comments,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobile: req.body.mobile,
            typeOfPhotoshoot: req.body.typeOfPhotoshoot,
        });
        const result = await customer.save()
        res.json(result);

    } catch (error) {
        console.log(error)
        res.json(error)
    }
}
router.post('/forms/add-call-back',  cors(), (req, res) => customerAdd(req, res))



export default router;