const { isNumber, isEmpty } = require("lodash");
const UserService = require("../services/user-service");
const { AppError } = require("../utils/app-error");
const User = require("../models/user");

class UserController {
  static getUserById = async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const user = await User.findOne({ where: { user_id } });

      if (!user) {
        throw new AppError("User not found", 404);
      }

      res.status(200).json({
        message: "Success",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };

  static updateUserDetails = async (req, res, next) => {
    try {
      const user_id = req.params.user_id;
      const {
        avatar_name,
        first_name,
        last_name,
        gender,
        date_of_birth,
        address_line_1,
        address_line_2,
        city,
        state,
        country,
        postal_code,
      } = req.body;

      if (user_id == null || !isNumber(user_id)) {
        throw new AppError("A valid user Id is required.", 400);
      }

      const user = await User.findOne({ where: { user_id } });

      if (!user || user.status === "N") {
        throw new AppError("No user found with the given Id.", 404);
      }

      if (postal_code && !/^[0-9]+$/.test(postal_code)) {
        throw new AppError("Enter a valid postal code.", 400);
      }

      await User.update({
        avatar_name,
        first_name,
        last_name,
        gender,
        date_of_birth,
        address_line_1,
        address_line_2,
        city,
        state,
        country,
        postal_code,
        modified_by: user_id // Example, this should be set according to the authenticated user
      }, {
        where: { user_id }
      });

      res.status(200).json({
        message: "Updated Successfully",
      });
    } catch (err) {
      next(err);
    }
  };

  static getAllUserDetails = async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

  static createUser = async (req, res, next) => {
    try {
      const { avatar_name, mobile_no, password, created_by, first_name, last_name, gender, date_of_birth, address_line_1, address_line_2, city, state, country, postal_code } = req.body;
  
      if (!mobile_no || !password || !created_by) {
        throw new AppError("Required fields are missing.", 400);
      }
  
      const newUser = await User.create({
        avatar_name,
        mobile_no,
        password,
        created_by,
        first_name,
        last_name,
        gender,
        date_of_birth,
        address_line_1,
        address_line_2,
        city,
        state,
        country,
        postal_code
      });
  
      res.status(201).json({
        message: "User created successfully",
        data: newUser,
      });
    } catch (err) {
      next(err);
    }
  };
  
  static updateUser = async (req, res, next) => {
    try {
      const user_id = req.params.user_id;
      const [updated] = await User.update(req.body, {
        where: { user_id },
        returning: true,
      });

      if (!updated) {
        throw new AppError("User not found", 404);
      }

      const updatedUser = await User.findOne({ where: { user_id } });

      res.status(200).json({
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  };

  static deleteUser = async (req, res, next) => {
    try {
      const user_id = req.params.user_id;
      const deleted = await User.destroy({ where: { user_id } });

      if (!deleted) {
        throw new AppError("User not found", 404);
      }

      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = UserController;
