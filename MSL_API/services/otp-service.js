const { sequelize, Sequelize } = require('../configDB.js');

const { Op } = require('sequelize');
const crypto = require("crypto");
const moment = require('moment');

const {logger} = require("../utils/winston-logger.js");
const AppOTPSmsTemplate = require('../models/otp-sms-template.js');
const AppOTPDetails = require('../models/otp-details.js');
const User = require('../models/user.js');


require('dotenv').config();


const sendOTPService = async (user_mobile_no) => {
    
    let transaction;
  
    try {
      // Start a transaction
      transaction = await sequelize.transaction();
  
      const otp_value = Math.floor(1000 + Math.random() * 9000);
      const hashedMobileNo = hashMobileNumber(user_mobile_no);
      const user = await User.findOne({
        where: {
          mobile_no: hashedMobileNo
        },
        transaction
      });
  
      let template_record_id;
      if (user) {
        template_record_id = process.env.login_template_record_id;
        console.log("template login id " + template_record_id);
      } else {
        template_record_id = process.env.register_template_record_id;
        console.log("template register id " + template_record_id);
      }
      console.log("template record id " + template_record_id);
  
      const template = await AppOTPSmsTemplate.findOne({
        where: {
          template_id: template_record_id,
        },
        attributes: ['template_message'],
        transaction
      });
  
      console.log("template " + template);
  
      const templateMessage = template ? template.template_message : null;
      const modifiedMessage = templateMessage.replace('{#var#}', otp_value).replace('{#app_signature#}',process.env.app_signature);

      const newData = await AppOTPDetails.create({
        user_mobile_no: hashedMobileNo,
        otp_value: otp_value,
        expire_at: otp_expire_at(),
        usage_status: 'unused',
        otp_count: 1,
        created_by: 1,
        status : 'Y',
        template_record_id: template_record_id,
        otp_attempts: 0,
      }, { transaction });
  
      await transaction.commit();
      return { data :{reference_id: newData.record_id, modifiedMessage:modifiedMessage}, error : null };
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error("Error in sendingOTP:", error);
      return {data : null , error : error};
    }
  };
      

  const verifyOTPService = async (reference_id, otp_value, phone_number) => {
    let transaction;
    let user_record_id;
    let isNewUser;
  
    try {
      transaction = await sequelize.transaction();
      const dbStartTime = Date.now();
  
      const verifyUser = await AppOTPDetails.findOne({
        where: {
          record_id: reference_id,
          otp_value: otp_value,
          expire_at: { [Op.gt]: moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss') },
          usage_status: 'unused',
          status: 'Y'
        },
        transaction,
      });
      const hashMobileNo = hashMobileNumber(phone_number);
      if (verifyUser) {
        const user = await User.findOne({
          where: {
            mobile_no: hashMobileNo
          },
          attributes: ['user_id'],
          transaction
        });
  
        if (user !== null) {
          user_record_id = user.user_id;
          isNewUser = false;
        } else {
          const newUser = await User.create({
            mobile_no: hashMobileNo,
            created_by: 1,
            status: 'Y',
          }, { transaction });
  
          user_record_id = newUser.id;
          isNewUser = true;
        }
  
        await AppOTPDetails.update({
          usage_status: 'used',
          status : 'N'
        }, {
          where: {
            record_id: reference_id
          },
          transaction
        });
  
        await transaction.commit();
        const dbEndTime = Date.now();
        logger.info(`Db Query | verifyOTP  |  DbQueryTime: ${dbEndTime - dbStartTime}`);
  
        return { data :{  user_record_id: user_record_id, isNewUser: isNewUser}, error : null };
      } else {
        return {data:null, error: 'Incorrect or expired OTP.'}; // Indicate OTP verification failure
      }
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error("Error in verifying OTP:", error);
      return {data : null, error : error}
    }
  };
  

  const resendOTPService = async (reference_id, phone_number) => {
    let transaction;
    let new_reference_id;
    let modifiedMessage;
  
    try {
      transaction = await sequelize.transaction();
      const dbStartTime = Date.now();
  
      const hashMobileNo = hashMobileNumber(phone_number);
      const getOTPDetails = await AppOTPDetails.findOne({
        where: {
          user_mobile_no: hashMobileNo,
          record_id: reference_id,
          usage_status: 'unused',
          status: 'Y'
        },
        attributes: ['otp_value', 'otp_count', 'expire_at', 'template_record_id', 'record_id'],
        // include: [{
        //   model: AppOTP,
        //   attributes: ['template_message'],
        //   required: true
        // }],
        transaction
      });
  
      if (getOTPDetails) {
        const otp_count = getOTPDetails.otp_count;
        const expire_at = getOTPDetails.expire_at;
        const otp_value = getOTPDetails.otp_value;
        const template_record_id = getOTPDetails.template_record_id;
       
        console.log("Template record Id : ", template_record_id);

        const template = await AppOTPSmsTemplate.findOne({
          where: {
            template_id:template_record_id,
          },
          attributes: ['template_message'],
          transaction
        });

        const templateMessage = template ? template.template_message : null;
       

  
        if (expire_at > Date.now() && otp_count <= 3) {
          new_reference_id = reference_id;
          await AppOTPDetails.update({
              otp_count: otp_count + 1,
            }, {
              where: {
                record_id: reference_id
              },
              transaction
            }
          );
          modifiedMessage = templateMessage.replace('{#var#}', otp_value).replace('{#app_signature#}',process.env.app_signature);
        } else if (otp_count > 3) {
          const new_otp_value = Math.floor(1000 + Math.random() * 9000);
          const newOTPdetails = await AppOTPDetails.create({
              user_mobile_no: hashMobileNo,
              otp_value: new_otp_value,
              expire_at: otp_expire_at(),
              usage_status: 'unused',
              otp_count: 1,
              created_by: 1,
              status: 'Y',
              template_record_id: template_record_id,
              otp_attempts: 0
            }, { transaction }
          );
          modifiedMessage = templateMessage.replace('{#var#}', new_otp_value).replace('{#app_signature#}',process.env.app_signature);
  
          new_reference_id = newOTPdetails.record_id;
        } else {
          return {data : null, error : "Internal Error."};
        }
      } else {
        console.log('Otp details not found.');
        return {data : null, error : "Otp details not found."};
      }
  
      await transaction.commit();
      const dbEndTime = Date.now();
      logger.info(`Db Query | verifyOTP  |  DbQueryTime: ${dbEndTime - dbStartTime}`);
  
      return { data :{reference_id: new_reference_id, modifiedMessage: modifiedMessage}, error:null };
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error("Error while resending OTP:", error);
      return {data : null, error : error}
    }
  };

  const hashMobileNumber = (mobileNumber) => {
    const hash = crypto.createHash("sha256").update(mobileNumber).digest("hex");
    return hash;
  };

  const otp_expire_at = () =>{
    const expireAt =  moment().tz('Asia/Kolkata').add(15, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    return expireAt;
  }
  
module.exports = { sendOTPService,verifyOTPService,resendOTPService};
