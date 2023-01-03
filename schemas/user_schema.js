import mongoose from "mongoose";

const user_info_schema = new mongoose.Schema({
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
    user_id: {
        type: String,
    },
    b_email: {
        type: String,
        required: true
    },
    b_mobile:{
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        // required: true
    }
});



const User_info = new mongoose.model('user_info', user_info_schema)
export {User_info};