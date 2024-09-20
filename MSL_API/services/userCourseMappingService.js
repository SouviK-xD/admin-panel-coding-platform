// services/UserCourseMappingService.js
const { UserCourseMapping } = require('../models/userCourseMapping');


class UserCourseMappingService {
  
  static addUserCourseMappingService = async (userCourseMappingData) => {
    try {

      const newUserCourseMapping = await UserCourseMapping.create(userCourseMappingData);
  
      return { data: newUserCourseMapping, error: null };

    } catch (error) {
      console.error('Error at addUserCourseMappingService:', error);
      return { data: null, error: error };
    }
  };
}

module.exports = UserCourseMappingService;
