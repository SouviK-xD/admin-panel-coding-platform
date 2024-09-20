const User = require("../models/user");

class UserService {
  // Not used, remove if not needed
  static getUserDetailsById = async (user_id) => {
    try {
      const user = await User.findOne({ where: { user_id } });
      return {
        data: user,
        error: null,
      };
    } catch (error) {
      return { data: null, error: error };
    }
  };

  static updateUserDetails = async (
    user_id,
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
    postal_code
  ) => {
    try {
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

      return {
        message: "success",
        error: null,
      };
    } catch (error) {
      return { message: "fail", error: error };
    }
  };
}

module.exports = UserService;
