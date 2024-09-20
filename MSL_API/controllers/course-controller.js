const CourseService = require("../services/course-service");


class CourseController {
  static getAllCourses = async (req, res, next) => {
    //#swagger.tags=['Courses']
    // #swagger.summary = 'API to get all courses.'
    // #swagger.description = 'This API will be used to get all courses data.'

    try{
      console.log(">>Controller : Inside getAllCourses.. ");
      const { data, error } = await CourseService.getAllCourses();
      if (data == null) {
        throw error;
      }
  
      res.status(200).json({
        message: "Success",
        data: data,
      });
    }
    catch(err){
      return next(err, req, res);
    }

  };

  static getCoursesToDisplay = async (req, res, next) => {
    //#swagger.tags=['Courses']
    // #swagger.summary = 'API to get all courses to display on home page.'
    // #swagger.description = 'This API will be used to get courses to display on home page.'

    try{
      console.log(">>Controller : Inside getCoursesToDisplay.. ");
      const { data, error } = await CourseService.getAllCoursesToDisplay();
      if (data == null) {
        throw error;
      }
  
      res.status(200).json({
        message: "Success",
        data: data,
      });
    }
    catch(err){
      return next(err,req,res);
    }
  };


  static createCourse = async (req, res, next) => {
    try {
      const newCourseData = req.body;
      const user_id = req.user ? req.user.user_id : 1; // Assuming user_id comes from auth middleware, defaulting to 1 for testing
      
      const { data, error } = await CourseService.createCourse(newCourseData, user_id);
      if (error) throw error;
  
      res.status(201).json({ message: "Course created successfully", data });
    } catch (err) {
      return next(err, req, res);
    }
  };
  

  static updateCourse = async (req, res, next) => {
    try {
      const { course_id } = req.params;
      const updatedCourseData = req.body;
      const { data, error } = await CourseService.updateCourse(course_id, updatedCourseData);
      if (error) throw error;

      res.status(200).json({ message: "Course updated successfully", data });
    } catch (err) {
      return next(err, req, res);
    }
  };

  static deleteCourse = async (req, res, next) => {
    try {
      const { course_id } = req.params;
      const { data, error } = await CourseService.deleteCourse(course_id);
      if (error) throw error;

      res.status(200).json({ message: "Course deleted successfully", data });
    } catch (err) {
      return next(err, req, res);
    }
  };
}

module.exports = CourseController;
