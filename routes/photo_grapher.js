import express from "express";
const router = express.Router();
import { Photo_Grapher } from '../schemas/photo_grapher.js';
import { v4 as uuidv4 } from 'uuid';
import Bcrypt from "bcryptjs";
import cors from 'cors';

const photographerAdd = async (req, res) => {
    try {
        const photo_grapher = new Photo_Grapher({
            id: uuidv4(),
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            location: req.body.location

        });
        const result = await photo_grapher.save()
        res.json(result);

    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

const getPhotographerbyLocation = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    const location = req.params.location
    console.log(req.params)
    try {
        const photoGrapher = await Photo_Grapher.findOne({ location })
        res.json(photoGrapher);
    } catch (error) {
        console.error(error)
    }
}

const getPhotographerbyId = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    const id = req.params.id
    console.log(req.params)
    try {
        const photoGrapher = await Photo_Grapher.findOne({ id })
        res.json(photoGrapher);
    } catch (error) {
        console.error(error)
    }
}

router.post('/photographer/set-photographer-request', (req, res) => photographerAdd(req, res))
router.get('/photographer/get-photographer-by-location/:location', (req, res) => getPhotographerbyLocation(req, res))
router.get('/photographer/get-photographer-by-id/:id', (req, res) => getPhotographerbyId(req, res))



export default router;