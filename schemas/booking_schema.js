import mongoose  from "mongoose";

const booking_schema = new mongoose.Schema({

    c_name: {
        type: String
    },
    c_mobile: {
        type: String
    },
    c_email: {
        type: String
    },
    user_services1: {
        type: String
    },
    user_services2: {
        type: String
    },
    time: {
        type: String
    },
    user_address: {
        type: String
    },
    package_price: {
        type: String
    },
    location: {
        type: String
    },
    date: {
        type: String
    },
    c_package: {
        type: String
    },
    payment_status: {
        type: String
    },
    booking_status: {
        type: String
    },
})
const Booking_info = new mongoose.model('booking_info',booking_schema)
export {Booking_info};