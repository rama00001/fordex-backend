import mongoose from "mongoose";
import validator from "validator";

const otp_info_schema = new mongoose.Schema({
  mobile: {
    type: String,
    required: [true, "Please enter your mobile number"],
    validate: [validator.isMobilePhone, "Please enter valid phone number"]
  },
  phoneOtp:{
    type: String
  }
});

const Otp_info = new mongoose.model("otp_info", otp_info_schema);

export { Otp_info };
