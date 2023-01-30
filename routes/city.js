import express from "express";
const router = express.Router();
import { City_info } from '../schemas/city_schema.js';
import { v4 as uuidv4 } from 'uuid';
import Bcrypt from "bcryptjs";
import cors from 'cors';

const cityAdd = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
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
        const result = await city.save()
        res.json(result);

    } catch (error) {
        res.json({ message: error.errors.status.message })
    }
}

const cityById = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const id = req.params.id
    try {
        const cityInfo = await City_info.findOne({ "data.id": id })
        if (cityInfo == null || cityInfo == '' || !cityInfo) {
            res.json({ staus: "false", data: null, message: "city not found" });;
        }
        else {
            res.json(cityInfo);
        }
    } catch (error) {
        res.send(error);
    }
}


const cityByName = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const _place = req.params.place;
    console.log(_place)
    try {
        const cityInfo = await City_info.findOne({ "data.place": _place })
        if (cityInfo == null || cityInfo == '' || !cityInfo) {
            res.json({ staus: "false", data: null, message: "city not found" });;
        }
        else {
            res.json(cityInfo);
        }
    } catch (error) {
        res.send(error);
    }
}


let corsOptions = {
    origin: ['http://localhost:5500', 'http://localhost:3000', 'http://localhost:3005']
};

router.post('/city/set-city-details', cors(), (req, res) => cityAdd(req, res))
router.get('/city/get-city-by-id/:id', cors(), (req, res) => cityById(req, res))
router.get('/city/get-city-by-name/:place', cors(), (req, res) => cityByName(req, res))

export default router;