const CategoryService = require("../services/category-service");

class CategoryController {
    static getCourseCategories = async (req, res, next) => {
      // #swagger.tags=['Category']
      // #swagger.summary = 'Get course categories.'
      // #swagger.description = 'This API will be used to get all course categories in the database.'
      try {
        console.log(">>Controller : Inside getCourseCategories.. ");
  
        const { data, error } = await CategoryService.getCourseCategories();
        if (data == null) {
          throw error;
        }
  
        res.status(200).json({
          message: "Success",
          data: data,
        });
      } catch (err) {
        next(err, req, res);
      }
    };

    static getPracticeCategories = async (req, res, next) => {
      // #swagger.tags=['Category']
      // #swagger.summary = 'Get practice categories.'
      // #swagger.description = 'This API will be used to get all practice categories in the database.'
      try {
        console.log(">>Controller : Inside getPracticeCategories.. ");
  
        const { data, error } = await CategoryService.getPracticeCategories();
        if (data == null) {
          throw error;
        }
  
        res.status(200).json({
          message: "Success",
          data: data,
        });
      } catch (err) {
        next(err, req, res);
      }
    };
}

module.exports = CategoryController;