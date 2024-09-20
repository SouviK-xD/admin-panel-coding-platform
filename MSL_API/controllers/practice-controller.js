const { isEmpty } = require("lodash");

const { AppError } = require("../utils/app-error");
const path = require("path");
const PracticeService = require("../services/practice-service");
const UserCourseMappingService = require('../services/userCourseMappingService');


class PracticeController {
  
  static getAllPracticesController = async (req, res, next) => {
    // #swagger.tags=['Practice']
    // #swagger.summary = 'Get All Practices'
    // #swagger.description = 'This API will be used to get all practices in the database.'
    try {
      console.log(">>Inside getAllPracticesController.. ");

      const { data, error } = await PracticeService.getAllPracticeService();
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


  
  
  ///NEW CONTROLLER
    
  static async addUserCourseMappingController(req, res, next) {

    try {
      console.log('Request body:', req.body);

      const { user_id, record_id, avatar_name } = req.body;

      // Validate required fields
      if (!user_id || !record_id || !avatar_name) {
        throw new AppError('user_id, record_id, and avatar_name are required.', 400);
      }

      const userCourseMappingData = {
        user_id,
        course_id: record_id, 
        created_by: user_id,
        modified_by: user_id,
      };
      const { data, error } = await UserCourseMappingService.addUserCourseMappingService(userCourseMappingData);

      if (error) {
        throw new AppError(`Failed to save user course mapping. ${error.message}`, 500);
      }

      res.status(201).json({
        message: 'User course mapping saved successfully.',
        data: data,
      });

    } catch (err) {
      next(err);
    }
  }

  
  /// till here


  

  static getPracticeByIdController = async (req, res, next) => {
    // #swagger.tags=['Practice']
    // #swagger.summary = 'Get Practice By Practice Id'
    // #swagger.description = 'This API will be used to get practice with the given practice Id.'
    try {
      console.log(">>Inside getPracticeByIdController.. ");

      const { practiceId } = req.body;

      if (practiceId == null) {
        throw new AppError("Practice Id is required.", 400);
      }

      const { data, error } = await PracticeService.getPracticeByIdService(
        practiceId
      );
      console.log("Controleer data", data);
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

  static getAllPracticesByCategoryIdController = async (req, res, next) => {
    // #swagger.tags=['Practice']
    // #swagger.summary = 'Get All Practices of a particular category.'
    // #swagger.description = 'This API will be used to get all practices mapped to the given category Id.'
    try {
      console.log(">>Inside getPracticesToDisplayController.. ");

      const { categoryId } = req.body;
      console.log(categoryId);
      if (null == categoryId || categoryId > 3) {
        throw new AppError("Provide valid Category id", 400);
      }

      const { data, error } =
        await PracticeService.getAllPracticeByCategoryIdService(categoryId);
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

  static getPracticesToDisplayController = async (req, res, next) => {
    // #swagger.tags=['Practice']
    // #swagger.summary = 'Get All Practices to display at Home Page'
    // #swagger.description = 'This API will be used to get all practices to display at home page.'
    try {
      console.log(">>Inside getPracticesToDisplayController.. ");

      const { data, error } =
        await PracticeService.getPracticesToDisplayService();
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

  static getPracticesToDisplayByCategoryIdController = async (
    req,
    res,
    next
  ) => {
    // #swagger.tags=['Practice']
    // #swagger.summary = 'Get Practices of given category to be displayed on home page'
    // #swagger.description = 'This API will be used to get all practices mapped to the category Id and that will be displayed on home page.'
    try {
      console.log(">>Inside getPracticesToDisplayController.. ");

      const { categoryId } = req.body;
      console.log(categoryId);
      if (null == categoryId || categoryId > 3) {
        throw new AppError("Provide valid Category id", 400);
      }

      const { data, error } =
        await PracticeService.getPracticesToDisplayByCategoryId(categoryId);
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


  static createPracticeController = async (req, res, next) => {
    try {
      const { practice_title, description, status, display, problem_count, review_ratings, learner_count, created_by } = req.body;
      const { success, error } = await PracticeService.createPracticeService({
        practice_title,
        description,
        status,
        display,
        problem_count,
        review_ratings,
        learner_count,
        created_by,
      });

      if (!success) {
        throw new AppError('Error creating practice', 500);
      }

      res.status(201).json({ message: 'Practice created successfully' });
    } catch (err) {
      next(err);
    }
  };

  static updatePracticeController = async (req, res, next) => {
    try {
      const practiceId = req.params.id;
      const { practice_title, description, status, display, problem_count, review_ratings, learner_count, modified_by } = req.body;
      const { success, error } = await PracticeService.updatePracticeService(practiceId, {
        practice_title,
        description,
        status,
        display,
        problem_count,
        review_ratings,
        learner_count,
        modified_by,
      });

      if (!success) {
        throw new AppError('Error updating practice', 500);
      }

      res.status(200).json({ message: 'Practice updated successfully' });
    } catch (err) {
      next(err);
    }
  };

  static deletePracticeController = async (req, res, next) => {
    try {
      const practiceId = req.params.id;
      const { success, error } = await PracticeService.deletePracticeService(practiceId);

      if (!success) {
        throw new AppError('Error deleting practice', 500);
      }

      res.status(200).json({ message: 'Practice deleted successfully' });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = PracticeController;
