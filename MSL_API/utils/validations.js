const { isEmpty } = require("lodash");
const { AppError } = require("./app-error");
function isValidPassword(password) {
  if (password.length < passwordValidationRules.minLength) {
    return false;
  }

  const lowercaseRegex = /[a-z]/g;
  const uppercaseRegex = /[A-Z]/g;
  const numbersRegex = /[0-9]/g;
  const specialCharsRegex = /[^a-zA-Z0-9]/g;

  if (
    !password.match(lowercaseRegex) ||
    password.match(lowercaseRegex).length < passwordValidationRules.minLowercase
  ) {
    return false;
  }

  if (
    !password.match(uppercaseRegex) ||
    password.match(uppercaseRegex).length < passwordValidationRules.minUppercase
  ) {
    return false;
  }

  if (
    !password.match(numbersRegex) ||
    password.match(numbersRegex).length < passwordValidationRules.minNumbers
  ) {
    return false;
  }

  if (
    !password.match(specialCharsRegex) ||
    password.match(specialCharsRegex).length <
      passwordValidationRules.minSpecialChars
  ) {
    return false;
  }

  return true;
}

const passwordValidationRules = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSpecialChars: 1,
};

function validateUser(avatar_name, mobile_no, password) {
  console.log(">>Inside Validations..");
  
  if (mobile_no == null || isEmpty(mobile_no)) {
    console.log(">>Mobile Number is null..");
    throw new AppError(
      "Mobile Number can't be null or empty. Please provide a valid mobile number.",
      400
    );
  }

  if (password == null || isEmpty(password)) {
    console.log(">>Password is null..");
    throw new Error("Password can't be null. Please provide a valid password.");
  }

  if (!isValidPassword(password)) {
    console.log(">>Password is invalid..");
    throw new Error(
      "Password does not meet requirements. Please provide a valid password."
    );
  }
}

const validateUserLogin = (mobile_no, password) => {
  if (mobile_no == null || isEmpty(mobile_no)) {
    console.log(">>Mobile Number is null..");
    throw new AppError(
      "Mobile Number can't be null or empty. Please provide a valid Mobile Number.",
      400
    );
  }
  if (password == null || isEmpty(password)) {
    console.log(">>Password is null..");
    throw new Error("Password can't be null. Please provide a valid password.");
  }
};

module.exports = {
  validateUser,
  validateUserLogin
};
