const {
  sendOTPService,
  verifyOTPService,
  resendOTPService,
} = require("../services/otp-service.js");
const {logger} = require("../utils/winston-logger.js");
const { sendOTPmobile } = require("../controllers/send-otp-sms-controller.js");
const { log } = require("winston");

const sendOTP = async (req, res) => {
  //#swagger.tags=['Authentication']
  //#swagger.summary = 'Send OTP'
  //#swagger.description = 'This API will be used to send otp to user's mobile number.'
  console.log("At send otp controller");
  const apiStartTime = Date.now();
  const { mobile_no: phone_number } = req.body;

  try {
    const { data: newData, error } = await sendOTPService(phone_number);


    if (newData) {
      const apiEndTime = Date.now();
      logger.info(
        `API | sendOTP | [${req.method}] | ${req.originalUrl} | Status: ${
          res.statusCode
        } | Total api time: ${apiEndTime - apiStartTime}`
      );

      console.log(newData);

      await sendOTPmobile(phone_number, newData.modifiedMessage)
        .then((response) => {
          console.log(response);
          return res.status(200).json({
            data :{reference_id: newData.reference_id},
            message : "OTP sent successfully."
          });
        })
        .catch((error) => {
          console.error("Error in Sending OTP", error);
          return res.status(500).json({ message: error.message });
        });
    } else {
      res.status(500).json({ message: error });
    }
  } catch (error) {
    console.error("Error in sending OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyOTP = async (req, res) => {
  //#swagger.tags=['Authentication']
  //#swagger.summary = 'Verify OTP'
  //#swagger.description = 'This API will be used to verify otp.'
  const apiStartTime = Date.now();
  const { reference_id, otp_value, mobile_no :phone_number } = req.body;
  console.log(req.body);

  try {
    const {data :newData, error} = await verifyOTPService(
      reference_id,
      otp_value,
      phone_number
    );
    console.log(newData);
    if (newData) {
      const apiEndTime = Date.now();
      logger.info(
        `API | verifyOTP | [${req.method}] | ${req.originalUrl} | Status: ${
          res.statusCode
        } | Total api time: ${apiEndTime - apiStartTime}`
      );

     
      res
        .status(200)
        .json({ message: "OTP verified Successfully", data: newData });
    } else {
      res.status(400).json({ message: error });
    }
  } catch (error) {
    console.error("Error in verifying OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const resendOTP = async (req, res) => {
  //#swagger.tags=['Authentication']
  //#swagger.summary = 'Resend OTP'
  //#swagger.description = 'This API will be used to resend otp to user's mobile number.'
  const apiStartTime = Date.now();
  const { reference_id, mobile_no:phone_number } = req.body;

  try {
    const { data:newData,error} = await resendOTPService(reference_id, phone_number);
    if (newData) {
      const apiEndTime = Date.now();
      logger.info(
        `API | resendOTP | [${req.method}] | ${req.originalUrl} | Status: ${
          res.statusCode
        } | Total api time: ${apiEndTime - apiStartTime}`
      );

      await sendOTPmobile(phone_number, newData.modifiedMessage)
      .then((response) => {
        console.log(response);
        return res.status(200).json({
          data :{reference_id: newData.reference_id},
          message : "OTP resent successfully."
        });
      })
      .catch((error) => {
        console.error("Error in Sending OTP", error);
        return res.status(500).json({ message: error.message });
      });

    } else {
      res.status(400).json({ message: error });
    }
  } catch (error) {
    console.error("Error in resending OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { sendOTP, verifyOTP, resendOTP };
