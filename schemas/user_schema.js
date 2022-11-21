import mongoose from "mongoose";

const user_info_schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    mobile_number:{
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
});



const User_info = new mongoose.model('user_info', user_info_schema)
export {User_info};