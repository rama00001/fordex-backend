
import express from 'express';
const app = express()
const port = 3000
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors';
// const cors = require('cors');
// const cors = require("cors");

dotenv.config()


import mongoose from 'mongoose';

// mongoose.connect("mongodb://localhost:27017/ino").then(() => {
//   console.log('db connection successfull')
// }).catch((err) => {
//   console.log(err)
// });

const url = `mongodb+srv://test:test@cluster0.cfitsxt.mongodb.net/?retryWrites=true&w=majority`;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
  .then(() => {
    console.log('Connected to the database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors())
app.use(express.json());

const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
  origin: allowedOrigins
};

app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.status(200).send('Hello from the other side!')
})

app.get('/test', (req, res) => {
  console.log('api hit')
  res.status(200).send('Hello from the other side!')
})

import city from './routes/city.js';
app.use(city);

import photo_grapher from './routes/photo_grapher.js';
app.use(photo_grapher);


import booking from './routes/booking.js';
app.use(booking)
// var corsOptions = {
//   credentials: true,
//   origin: ['http://localhost:3000', 'http://localhost:80']
// }
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// })



app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})