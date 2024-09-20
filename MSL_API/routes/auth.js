const express = require("express");

const {
  SignUpController,
  LoginController,
} = require("../controllers/auth-controller");
const { sendOTP, verifyOTP, resendOTP } = require("../controllers/otp-controller");

const authRouter = express.Router();

authRouter.post("/signup", SignUpController);
authRouter.post("/login", LoginController);
authRouter.post("/sendOtp", sendOTP);
authRouter.post("/verifyOtp", verifyOTP);
authRouter.post("/resendOtp", resendOTP);


module.exports = authRouter;
