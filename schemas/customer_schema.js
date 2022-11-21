import mongoose from "mongoose";

const Customer_Info_Schema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    comments: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    typeOfPhotoshoot: {
        type: String,
        required: true
    }
});

const Customer_Info = new mongoose.model('customer', Customer_Info_Schema)
export { Customer_Info };