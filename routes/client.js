import express from "express";
const router = express.Router();
import { Client_info } from '../schemas/client_schema.js';
import Bcrypt from "bcryptjs";
import springedge from 'springedge';
import { Otp_info } from "../schemas/otp.js";
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';


const register = async (req, res) => {
  try {
    const b_firstname = req.body.b_firstname;
    const b_lastname = req.body.b_lastname;
    const b_email = req.body.b_email;
    const b_mobile = req.body.b_mobile;
    const b_password = req.body.b_password;
    const client = new Client_info({
      b_firstname, b_lastname, b_email, b_mobile, b_password
    });
    let result = await client.save()
    let response = {
      "b_firstname": result.b_firstname,
      "b_lastname": result.b_lastname,
      "b_email": result.b_email,
      "b_mobile": result.b_mobile,
    }
    res.json({ status: "true", data: response, "message": "Client registered successfully." });
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const login = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const b_email = req.body.b_email;
  const b_password = req.body.b_password;
  if (!b_email || !b_password) {
    return res.status(401).json({ message: 'Email or Password missing' });
  }
  Client_info.findOne({ b_email: b_email }, (err,client) => {
    if (err) {
      return res.json({ err });
    }
    if (client !== null) {
      if (b_password == client.b_password) {
        let response = {
          "b_firstname": client.b_firstname,
          "b_lastname": client.b_lastname,
          "b_email": client.b_email,
          "b_mobile": client.b_mobile,
        }
        res.json({ status: "true", data: response, "message": "Client logged in successfully." });
      } else {
        res.status(401).json({ message: 'Incorrect Password' })
      }
    }
    else {
      res.status(404).json({ result: 'client not found' })
    }
  })
}
const getClients = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const clientinfo = await Client_info.find()
    if (clientinfo == null || clientinfo == '' || !clientinfo) {
      res.json({ staus: "false", data: null, message: "client not found" });;
    }
    else {
      res.json(clientinfo);
    }
  } catch (error) {
    res.send(error);
  }
}

const getClientByMobile = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const mobile_number = req.params.b_mobile;
  console.log(mobile_number)
  try {
    const mobileInfo = await Client_info.findOne({ "b_mobile": mobile_number })
    if (mobileInfo == null || mobileInfo == '' || !mobileInfo) {
      res.json({ staus: "false", data: null, message: "mobile not found" });;
    }
    else {
      res.json(mobileInfo);
    }
  } catch (error) {
    res.send(error);
  }
}

router.post('/client/register-client', cors(), (req, res) => register(req, res))
router.get('/client/get-all-clients', cors(), (req, res) => getClients(req, res))
router.get('/client/get-client-by-mobile/:b_mobile', cors(), (req, res) => getClientByMobile(req, res))
router.get('/client/login-client', cors(), (req, res) => login(req, res))

export default router; 