const { isEmpty } = require("lodash");
const LanguageService = require("../services/language-service");
const { AppError } = require("../utils/app-error");

class LanguageController {
  // #swagger.tags=['Language']
  // #swagger.summary = 'Get All languages'
  // #swagger.description = 'This API will be used to get all languages in the database.'
  static getAllLanguages = async (req, res, next) => {
    try {
      console.log(">>Inside getAllLanguages.. ");

      const { data, error } = await LanguageService.getAllLanguageService();
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

  static getLanguageByName = async (req, res, next) => {
    // #swagger.tags=['Language']
    // #swagger.summary = 'Get language details by Name'
    // #swagger.description = 'This API will be used to get language details by their name.'
    try {
      console.log(">>Inside getAllLanguages.. ");

      const { language } = req.body;

      if (language == null || isEmpty(language)) {
        throw new AppError("Language is required .", 400);
      }

      const { data, error } = await LanguageService.getLanguageByName(language);
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

  static getLanguageByPracticeId = async (req, res, next) => {
    // #swagger.tags=['Language']
    // #swagger.summary = 'Get language mapped to the practice'
    // #swagger.description = 'This API will be used to get language details that is mapped to the practice Id.'
    try {
      console.log(">>Inside getLanguageByPracticeId.. ");

      const { practiceId } = req.body;

      if (practiceId == null) {
        throw new AppError("Practice Id is required .", 400);
      }

      const { data, error } = await LanguageService.getLanguageByPracticeId(
        practiceId
      );
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

module.exports = LanguageController;
