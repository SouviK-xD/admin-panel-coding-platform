const { sequelize } = require("../configDB");

class CourseService {

  static getAllCourses = async () => {
    console.log(">>Service : getAllCourses..");
    try {
      let data;
      await sequelize
        .query(`Select cm.*,ccm2.record_id as category_id,ccm2.category FROM course_master cm
                INNER JOIN course_category_mapping ccm ON cm.record_id = ccm.course_id 
                INNER JOIN course_category_master ccm2 ON ccm2.record_id = ccm.category_id 
                WHERE cm.status = 'Y' AND ccm.status = 'Y' AND ccm2.status = 'Y' ORDER BY ccm2.record_id ;`, 
                { 
          type: sequelize.QueryTypes.SELECT,
        })
        .then((result) => {
          console.log("result : ", result);
          data = result;
        });

      return {
        data: data,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getAllCourses : " + error);
      return { data: null, error: error };
    }
  };

  static getAllCoursesToDisplay = async () => {
    console.log(">>Service : getAllCoursesToDisplay..");
    try {
      let data;
      await sequelize
        .query(`Select * FROM course_master`, {
          
          type: sequelize.QueryTypes.SELECT,
        })
        .then((result) => {
          console.log("result : ", result);
          data = result;
        });

      return {
        data: data,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getAllCoursesToDisplay : " + error);
      return { data: null, error: error };
    }
  };


  static createCourse = async (newCourseData, user_id) => {
    try {
      const { course_title, description, image, display, status } = newCourseData;
      await sequelize.query(
        `INSERT INTO course_master (course_title, description, image, display, status, created_by) VALUES (?, ?, ?, ?, ?, ?)`,
        {
          replacements: [course_title, description, image, display, status, user_id],
          type: sequelize.QueryTypes.INSERT,
        }
      );
      return { data: 'Course created successfully', error: null };
    } catch (error) {
      console.error("Error creating course: ", error);
      return { data: null, error };
    }
  };
  
  

  static updateCourse = async (course_id, updatedCourseData) => {
    try {
      const { course_title, description, image, display, status } = updatedCourseData;
      await sequelize.query(
        `UPDATE course_master SET course_title = ?, description = ?, image = ?, display = ?, status = ? WHERE record_id = ?`,
        {
          replacements: [course_title, description, image, display, status, course_id],
          type: sequelize.QueryTypes.UPDATE,
        }
      );
      return { data: 'Course updated successfully', error: null };
    } catch (error) {
      console.error("Error updating course: ", error);
      return { data: null, error };
    }
  };

  static deleteCourse = async (course_id) => {
    try {
      await sequelize.query(
        `DELETE FROM course_master WHERE record_id = ?`,
        {
          replacements: [course_id],
          type: sequelize.QueryTypes.DELETE,
        }
      );
      return { data: 'Course deleted successfully', error: null };
    } catch (error) {
      console.error("Error deleting course: ", error);
      return { data: null, error };
    }
  };

}

module.exports = CourseService;