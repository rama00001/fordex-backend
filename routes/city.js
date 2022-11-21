import express from "express";
const router = express.Router();
import { City_info } from '../schemas/city_schema.js';
import { Customer_Info } from '../schemas/customer_schema.js';
import { v4 as uuidv4 } from 'uuid';
import Bcrypt from "bcryptjs";
import cors from 'cors';

const cityAdd = async (req, res) => {
    console.log(req.body.data.id)
    try {
        const city = new City_info({
            status: req.body.status,
            message: req.body.message,
            data: {
                id: uuidv4(),
                place: req.body.data.place,
                spot1: req.body.data.spot1,
                spot2: req.body.data.spot2,
                spot3: req.body.data.spot3,
                spot4: req.body.data.spot4,
                spot5: req.body.data.spot5,
                spot6: req.body.data.spot6,
                about: req.body.data.about,
                map_link: req.body.data.map_link,
                status: req.body.status,
                message: req.body.message
            },
        });
        console.log("city" + city)
        const result = await city.save()
        console.log(result);
        res.json(result);

    } catch (error) {
        console.log(error)
        res.json(error)
    }
}



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


const cityById = async (req, res) => {
    const id = req.query.id
    try {
        const cityInfo = await City_info.findOne({ id })
        res.json(cityInfo);
    } catch (error) {
        console.error(error)
    }
}


const cityByName = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')

    const place = req.query.place
    try {
        const cityInfo = await City_info.findOne({ place })
        res.json(cityInfo);
    } catch (error) {
        console.error(error)
    }
}


let corsOptions = {
    origin: [ 'http://localhost:5500', 'http://localhost:3000','http://localhost:3005' ]
  };
  
router.post('/city/add', (req, res) => cityAdd(req, res))
router.get('/city/get-city-by-id/:id', (req, res) => cityById(req, res))
router.get('/city/get-city-by-name/:place',  cors() ,(req, res) => cityByName(req, res))
router.post('/forms/add-call-back',  cors(corsOptions), (req, res) => customerAdd(req, res))

export default router;