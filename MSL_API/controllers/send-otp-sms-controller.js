const express = require('express');
const https = require('https');
var urlencode = require('urlencode');
const { logger } = require('../utils/winston-logger');

require("dotenv").config();
const otpController = {};


const sendOTPmobile = async (user_mobile_number, message) => {
  return new Promise((resolve, reject) => {
      try {
            
          const msg = urlencode.encode(message);
          const apikey = process.env.message_api_key;
          const sender = process.env.message_sender;
          const number = user_mobile_number;
          
          const data = `apikey=${apikey}&sender=${sender}&numbers=${number}&message=${msg}`;
          
          const options = {
              host: 'api.textlocal.in',
              path: `/send?${data}`,
          };

          const reqHttps = https.request(options, function (response) {
              let str = '';
              response.on('data', function (chunk) {
                  str += chunk;
                  
                  logger.info(`API |SendOTPforLogin - TextLocal API  | OTP  | response: ${str}`);

              });

              response.on('end', function () {
                  
                  resolve({ message: 'OTP sent successfully' });
              });
          });

          reqHttps.on('error', function (error) {
                logger.error(`API | SendOTPforLogin - TextLocal API | Error: ${error.message}`);
              console.error('Error in HTTPS request:', error);
              reject({ message: 'Failed to send OTP. Please try again later.' });
          });

          reqHttps.end();
      } catch (error) {
          logger.error(`API | SendOTPforLogin - TextLocal API | Error: ${error.message}`);
          console.error('Error in sendOTP:', error);
          reject({ message: 'Failed to send OTP. Please try again later.' });
      }
  });
};

module.exports = {otpController,sendOTPmobile}
