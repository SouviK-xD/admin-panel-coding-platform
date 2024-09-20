const { sequelize } = require("../configDB");

class CategoryService {
  static getCourseCategories = async () => {
    console.log(">>Service : getCourseCategories..");
    try {
      let data;
      await sequelize
        .query(`SELECT * FROM course_category_master ccm WHERE status = 'Y';`, {
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
      console.log(">>Error at getCourseCategories : " + error);
      return { data: null, error: error };
    }
  };

  static getPracticeCategories = async () => {
    console.log(">>Service : getPracticeCategories..");
    try {
      let data;
      await sequelize
        .query(
          `SELECT * FROM practice_category_master ccm WHERE status = 'Y';`,
          {
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((result) => {
          console.log("result : ", result);
          data = result;
        });

      return {
        data: data,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getPracticeCategories : " + error);
      return { data: null, error: error };
    }
  };
}

module.exports = CategoryService;
