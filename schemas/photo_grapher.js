import mongoose from "mongoose";

const Photo_Grapher_Schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const Photo_Grapher = new mongoose.model('photo_grapher', Photo_Grapher_Schema)
export { Photo_Grapher };