import express from "express";
const router = express.Router();
import { User_info } from '../schemas/user_schema.js';
import Bcrypt from "bcryptjs";
import springedge from 'springedge';
import { Otp_info } from "../schemas/otp.js";
import { v4 as uuidv4 } from 'uuid';


const register = async (req, res) => {
    try {
        const b_firstname = req.body.b_firstname;
        const b_lastname = req.body.b_lastname;
        const b_email = req.body.b_email;
        const b_mobile = req.body.b_mobile;
        // const user_id = `${uuidv4()}`
        // const isActive = req.body.isActive;
        const b_password = Bcrypt.hashSync(req.body.b_password, 10);
        const user = new User_info({
          b_firstname, b_lastname, b_email, b_mobile, b_password
        });

        const result = await user.save()
        console.log(result);
        res.send({"message":"User registered successfully."});

    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

const loginUserWithOtp = async (req, res, next) => {
    try {
        const { mobile } = req.body;
        var digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        var params = {
            'apikey': '6on957rb36978j0rl148a6j226v03jmr',
            'sender': 'SEDEMO',
            'to': [
                mobile
            ],
            // 'message': `Your OTP is ${OTP}`,
            'message': `Hello ${OTP}, This is a test message from spring edge`,
            'format': 'json'
        };
        // async (req, res) => {?
        springedge.messages.send(params, 5000, function (err, response) {
            if (err) {
                return console.log(err);
            }
            else {
                const otp_info = new Otp_info({ mobile: mobile, phoneOtp: OTP })
                const result = otp_info.save();
                res.json({ message: "Otp sent to mobile" })
                console.log(response);
            }

        });

    }
    catch (error) {
        res.send(error);
    }
}

const verifyOTP = async (req, res, next) => {
    try {
      const { phoneOtp, mobile } = req.body;
      const otp_info = await Otp_info.findOne({ 'mobile': mobile, 'phoneOtp': phoneOtp });
      if(!otp_info){
        res.json({ status: 400, message: "Please check either otp or mobile number wrong" });
        return;
      }
      else if (otp_info?.phoneOtp !== phoneOtp) {
        res.json({ status: 400, message: "Incorrect otp" });
        return;
      }
      else if (otp_info?.mobile !== mobile) {
        res.json({ status: 400, message: "Mobile number not found" });
        return;
      }
      else {
        console.log( otp_info.mobile)
        Otp_info.findOneAndDelete({ mobile: otp_info.mobile })
        res.status(201).json({
          type: "success",
          message: "OTP verified successfully",
          // data: {
          //   // token,
          //   userId: user._id,
          // },
        });
      }
    } catch (error) {
      next(error);
    }
  };
  
router.post('/client/register-client', (req, res) => register(req, res))
router.post('/user/otpLogin', (req, res) => loginUserWithOtp(req, res))
router.post("/user/verifyOtp", (req,res,next)=> verifyOTP(req,res,next));


export default router;