const { SignUpService, LoginService } = require("../services/auth-service");
const { AppError } = require("../utils/app-error");

const SignUpController = async (req, res, next) => {
  //#swagger.tags=['Authentication']
  // #swagger.summary = 'Signup'
  // #swagger.description = 'This API will be used to register or signup user.'
  try {
    const userData = req.body;
    const { token, user, error } = await SignUpService(userData);

    if (error) {
      console.log(">>Error received from SignupService layer.. " + error);
      throw error;
    }
    if (!user) {
      throw new AppError("Failed to create a user..", 500);
    }

    return res.status(200).json({
      message: "Successfully Signed Up",
      data: user,
      token: token,
    });
  } catch (err) {
    next(err, req, res);
  }
};

const LoginController = async (req, res, next) => {
  // #swagger.tags=['Authentication']
  // #swagger.summary = 'Signin'
  // #swagger.description = 'This API will be used to login user.'
  try {
    const userLoginData = req.body;
    const { token, user, error } = await LoginService(userLoginData);

    if (error) {
      console.log(">>Error received from LoginService.. " + error);
      throw error;
    }
    if (user == null) {
      console.log(">>User is null..");
      throw new AppError("Failed to Login.", 500);
    }

    return res.status(200).json({
      message: "Successfully Logged In",
      data: user,
      token: token,
    });
  } catch (err) {
    next(err, req, res);
  }
};

module.exports = {
  SignUpController,
  LoginController,
};
