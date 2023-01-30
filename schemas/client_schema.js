import mongoose from "mongoose";

const client_info_schema = new mongoose.Schema({
    b_firstname: {
        type: String,
        required: true
    },
    b_lastname: {
        type: String,
        required: true
    },
    b_password: {
        type: String,
        required: true
    },
    b_email: {
        type: String,
        required: true
    },
    b_mobile:{
        type: String,
        required: true
    }
});



const Client_info = new mongoose.model('client_info', client_info_schema)
export {Client_info};