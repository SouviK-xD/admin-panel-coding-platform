const { isEmpty } = require("lodash");
const QuestionService = require("../services/question-service");
const { AppError } = require("../utils/app-error");

class QuestionController {
  static getAllQuestionsController = async (req, res, next) => {
    try {
      console.log(">>Inside getAllQuestionsController..");

      const { data, error } = await QuestionService.getAllQuestionsService();
      if (error) {
        throw new AppError("Error fetching questions.", 500);
      }

      res.status(200).json({
        message: "Success",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  };

  static getQuestionByTopicAndLevel = async (req, res, next) => {
    try {
      console.log(">>Inside getQuestionByTopicAndLevel..");

      const { practiceTopicId, level } = req.body;
      if (!practiceTopicId) {
        throw new AppError("Practice-Topic Id is required.", 400);
      }
      if (!level || isEmpty(level)) {
        throw new AppError("Difficulty Level is required.", 400);
      }

      const { data, error } = await QuestionService.getQuestionsByTopicAndLevel(
        practiceTopicId,
        level
      );
      if (error) {
        throw new AppError("Error fetching questions by topic and level.", 500);
      }

      res.status(200).json({
        message: "Success",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  };

  static getQuestionByPracticeTopicId = async (req, res, next) => {
    try {
      console.log(">>Inside getQuestionByPracticeTopicId..");

      const { practiceTopicId } = req.body;
      if (!practiceTopicId) {
        throw new AppError("Practice-Topic Id is required.", 400);
      }

      const { data, error } = await QuestionService.getQuestionsByPracticeTopicId(practiceTopicId);
      if (error) {
        throw new AppError("Error fetching questions by practice topic id.", 500);
      }

      res.status(200).json({
        message: "Success",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  };

  static getQuestionByPracticeIdAndTopicId = async (req, res, next) => {
    try {
      console.log(">>Inside getQuestionByPracticeIdAndTopicId..");

      const { practiceId, topicId } = req.body;
      if (!practiceId) {
        throw new AppError("Practice Id is required.", 400);
      }
      if (!topicId) {
        throw new AppError("Topic Id is required.", 400);
      }

      const { data, error } = await QuestionService.getQuestionsByPracticeIdAndTopicId(practiceId, topicId);
      if (error) {
        throw new AppError("Error fetching questions by practice id and topic id.", 500);
      }

      res.status(200).json({
        message: "Success",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  };

  static getQuestionDetails = async (req, res, next) => {
    try {
      console.log(">>Inside getQuestionDetails..");

      const { question_id, user_id } = req.body;
      if (!question_id) {
        throw new AppError("Question Id is required.", 400);
      }
      if (!user_id) {
        throw new AppError("User Id is required.", 400);
      }

      const { data, error } = await QuestionService.getQuestionDetailsById(question_id, user_id);
      if (error) {
        throw new AppError("Error fetching question details.", 500);
      }

      res.status(200).json({
        message: "Success",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  };

  static createQuestion = async (req, res, next) => {
    try {
      const { question, description, created_by, level, status, image_path } = req.body;
  
      if (!question || !description || !created_by || !level || !status) {
        throw new AppError("All fields (question, description, created_by, level, and status) are required", 400);
      }
  
      const newQuestionData = {
        question,
        description,
        created_by,
        level,
        status,
        image_path: image_path || null, // Optional image_path field
      };
  
      const { data, error } = await QuestionService.createQuestion(newQuestionData);
      if (error) {
        return res.status(500).json({ message: "Error creating question", error });
      }
  
      res.status(201).json({ message: "Question created successfully", data });
    } catch (err) {
      next(err);
    }
  };
  
  static editQuestion = async (req, res, next) => {
    try {
      const record_id = req.params.record_id;
      const { updated_by, question, description, level } = req.body;
      if (!record_id || !updated_by) {
        throw new AppError("Question ID and Updater ID are required.", 400);
      }

      const { data, error } = await QuestionService.updateQuestion({
        question_id: record_id,
        updated_by,
        question,
        description,
        level
      });
      if (error) {
        return res.status(500).json({ message: "Error updating question", error });
      }
      res.status(200).json({ message: "Question updated successfully", data });
    } catch (err) {
      next(err);
    }
  };

  static deleteQuestion = async (req, res, next) => {
    try {
      const record_id = req.params.record_id; 
      const deleted_by = req.query.deleted_by;  // Extract from query parameters
  
      if (!record_id) {
        throw new AppError("Question ID is required.", 400);
      }
      if (!deleted_by || isNaN(deleted_by)) {
        throw new AppError("Deleter ID is required and must be an integer.", 400);
      }
  
      const { data, error } = await QuestionService.deleteQuestion(record_id, deleted_by);
      if (error) {
        return res.status(500).json({ message: "Error deleting question", error });
      }
      res.status(200).json({ message: "Question deleted successfully", data });
    } catch (err) {
      next(err);
    }
  };
  
  
}

module.exports = QuestionController;
