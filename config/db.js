
import dotenv from 'dotenv'
dotenv.config();
import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/ino").then(() => {
    console.log('db connection successfull')
}).catch((err) => {
    console.log(err)
});
