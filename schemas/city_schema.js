import mongoose from "mongoose";

const city_data = new mongoose.Schema({
    id: {
        type: String
    },
    place: {
        type: String
    },
    spot1: {
        type: String,
    },
    spot2: {
        type: String
    },
    spot3: {
        type: String
    },
    spot4: {
        type: String,
        required: true
    },
    spot5: {
        type: String
    },
    spot6: {
        type: String
    },
    about: {
        type: String
    },
    map_link: {
        type: String
    }
});

const city_info_schema = new mongoose.Schema({
    status: {
        type: Boolean,
    },
    message: {
        type: String,
    },
    data: {
        type: city_data,
    }
});



const City_info = new mongoose.model('city_info', city_info_schema)
export { City_info };