const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { AppError } = require("../utils/app-error");
const { validateUser, validateUserLogin } = require("../utils/validations");

const { generateToken } = require("../middleware/jwt-authentication");
const { encrypt } = require("../utils/AES-util");
const crypto = require("crypto");

const SignUpService = async (userData) => {
  try {
    const { avatar_name, mobile_no, password } = userData;

    validateUser(avatar_name, mobile_no, password);
    console.log(">>Validation done..");

    const hashedMobileNo = hashMobileNumber(mobile_no);
    const existingUser = await User.findOne({
      where: { mobile_no: hashedMobileNo },
    });

    if (existingUser) {
      throw new AppError("User with this mobile number already exist. ", 400);
    }
    
    console.log(">>User does not exist..");
    const hashedPass = await hashPassword(password);

    console.log(">>Password is hashed..");
    const user = await User.build({
      avatar_name,
      mobile_no: hashedMobileNo,
      password: hashedPass,
      created_by: 0,
      status: "Y",
    });

    const payload = {
      user_id: user.user_id,
      avatar_name: user.avatar_name,
    };

    console.log("Signup Payload : ", payload);
    const token = generateToken(payload);

    saved_user = await user.save();
    console.log("saved_user : ", saved_user);

    const data = {
      user_id: saved_user.user_id,
      avatar_name: saved_user.avatar_name,
      first_name: saved_user.first_name || null,
      last_name: saved_user.last_name || null,
      gender: saved_user.gender || null,
      date_of_birth: saved_user.date_of_birth || null,
      address_line_1: saved_user.address_line_1 || null,
      address_line_2: saved_user.address_line_2 || null,
      city: saved_user.city || null,
      state: saved_user.state || null,
      country: saved_user.country || null,
      postal_code: saved_user.postal_code || null,
    };
    console.log("data -- ", data);
    console.log(">>New user model is created and added to db..");
    return { token: token, user: data, error: null };
  } catch (error) {
    console.log(">>Error occurred at service layer..");
    return { token: null, user: null, error: error };
  }
};

const LoginService = async (userData) => {
  try {
    const { mobile_no, password } = userData;

    const hashedMobileNo = hashMobileNumber(mobile_no);
    validateUserLogin(mobile_no, password);
    console.log(">>Validation done..");

    const user = await User.findOne({
      where: {
        mobile_no: hashedMobileNo,
        status: "Y",
      },
    });

    console.log(">>user: " + user);
    if (user == null) {
      console.log(">>User is null..");
      throw new AppError("User doesn't exist.", 404);
    }
    console.log(">>user is found.");

    if (!(await comparePassword(password, user.password))) {
      throw new AppError("Incorrect Password.", 401);
    }
    console.log(">>Password matches..");

    const payload = {
      user_id: user.user_id,
      avatar_name: user.avatar_name,
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender,
      date_of_birth: user.date_of_birth,
      address_line_1: user.address_line_1,
      address_line_2: user.address_line_2,
      city: user.city,
      state: user.state,
      country: user.country,
      postal_code: user.postal_code,
    };
    const token = generateToken(payload);
    console.log(">>Token generated..");
    return { token: token, user: payload, error: null };
  } catch (error) {
    return { token: null, user: null, error: error };
  }
};

const hashMobileNumber = (mobileNumber) => {
  const hash = crypto.createHash("sha256").update(mobileNumber).digest("hex");
  return hash;
};

const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(12);
  const hashedPass = await bcryptjs.hash(password, salt);
  return hashedPass;
};

const comparePassword = async (password, storedHashPass) => {
  return await bcryptjs.compare(password, storedHashPass);
};

module.exports = {
  SignUpService,
  LoginService,
};
