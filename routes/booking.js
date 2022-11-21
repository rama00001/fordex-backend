import express from "express";
const router = express.Router();
import { Booking_info } from '../schemas/booking_schema.js';
import { v4 as uuidv4 } from 'uuid';
import Bcrypt from "bcryptjs";
import cors from 'cors';

const shotAdd = async (req, res) => {
    try {
        const shotBooking = new Booking_info({
            id: uuidv4(),
            c_name: req.body.c_name,
            c_mobile: req.body.c_mobile,
            c_email: req.body.c_email,
            user_services1: req.body.user_services1,
            user_services2: req.body.user_services2,
            user_address: req.body.user_address,
            package_price: req.body.package_price,
            location: req.body.location,
            date: req.body.date,
            c_package: req.body.c_package,
            payment_status: req.body.payment_status,
            booking_status: req.body.booking_status
        });
        const result = await shotBooking.save()
        res.json(result);

    } catch (error) {
        res.json(error)
    }
}


const getAllBookings = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    try {
        const bookingList = await Booking_info.find()
        res.json(bookingList);
    } catch (error) {
        console.error(error)
    }
}

const updateBooking = async (req, res) => {
    const id = req.params.id;
    const payment_status = req.body.payment_status;
    const booking_status = req.body.payment_status;
    try {
        Booking_info.findOneAndUpdate({ _id: id }, { $set: { payment_status: payment_status, booking_status: booking_status } }, (err, response) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send("Booking status updated successfully.")
            }
        })
    }
    catch (err) {
        res.stauts(500).json({ error: err })
    }
    console.log(id)

}

let corsOptions = {
    origin: ['http://localhost:5500', 'http://localhost:3000', 'http://localhost:3005']
};

router.post('/booking/bookashoot', (req, res) => shotAdd(req, res))
router.get('/booking/get-all-bookings', (req, res) => getAllBookings(req, res))
router.put('/booking/update-booking-status/:id', (req, res) => updateBooking(req, res))

export default router;