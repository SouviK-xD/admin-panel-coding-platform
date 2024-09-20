const { isNumber } = require("lodash");
const SubmissionService = require("../services/submission-service");
const { AppError } = require("../utils/app-error");
const User = require("../models/user");
const Question = require("../models/question");

class SubmissionController {
  static getAllSubmissionsByUserIdAndQuesId = async (req, res, next) => {
    // #swagger.tags=['Submission']
    // #swagger.summary = 'Get all submissions of a particular user and question'
    // #swagger.description = 'This API will be used to get all submissions mapped to the userId and questionId.'
    try {
      console.log(">>Inside getAllSubmissionsByUserIdAndQuesId.. ");

      const { userId, questionId } = req.body;

      if (userId == null || !isNumber(userId)) {
        throw new AppError("Provide valid user id", 400);
      }

      const user = await User.findOne({ where: { user_id: userId } });
      if (user == null || user.status != "Y") {
        throw new AppError("No user found with the given userId.", 404);
      }

      if (questionId == null || !isNumber(questionId)) {
        throw new AppError("Provide a valid question Id.", 400);
      }

      const question = await Question.findOne({
        where: { record_id: questionId },
      });
      if (question == null || question.status != "Y") {
        throw new AppError("Question not found.", 404);
      }

      const { data, error } =
        await SubmissionService.getAllSubmissionsByUserIdAndQuesId(
          userId,
          questionId
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

  static getAllSubmissionsByUserId = async (req, res, next) => {
    // #swagger.tags=['Submission']
    // #swagger.summary = 'Get all submissions of a particular user.'
    // #swagger.description = 'This API will be used to get all submissions mapped to the userId.'
    try {
      console.log(">>Inside getAllSubmissionsByUserId.. ");

      const { userId } = req.body;

      if (userId == null || !isNumber(userId)) {
        throw new AppError("Provide valid user id", 400);
      }

      const user = await User.findOne({ where: { user_id: userId } });
      if (user == null || user.status != "Y") {
        throw new AppError("No user found with the given userId.", 404);
      }

      const { data, error } = await SubmissionService.getAllSubmissionsByUserId(
        userId
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

  static addSubmission = async (req, res, next) => {
    // #swagger.tags=['Submission']
    // #swagger.summary = 'Add submission for a particular user.'
    // #swagger.description = 'This API will be used to add submission of the user to the submissions table.'
    try {
      console.log(">>Inside addSubmission.. ");

      const {
        userId,
        questionId,
        submissionCode,
        timeTaken,
        languageUsed,
        submissionStatus,
      } = req.body;

      if (userId == null || !isNumber(userId)) {
        throw new AppError("Provide valid user id", 400);
      }

      const user = await User.findOne({ where: { user_id: userId } });
      if (user == null || user.status != "Y") {
        throw new AppError("No user found with the given userId.", 404);
      }

      if (questionId == null || !isNumber(questionId)) {
        throw new AppError("Provide a valid question Id.", 400);
      }

      const question = await Question.findOne({
        where: { record_id: questionId },
      });
      if (question == null || question.status != "Y") {
        throw new AppError("Question not found.", 404);
      }

      if (submissionCode == null) {
        throw new AppError("Submission Code is required", 400);
      }

      if (timeTaken == null) {
        throw new AppError("Time taken is required.", 400);
      }

      if (languageUsed == null) {
        throw new AppError("Language Used is required.", 400);
      }

      if (submissionStatus == null) {
        throw new AppError("Submission Stauts is required.", 400);
      }

      const { message, error } = await SubmissionService.addSubmission(
        userId,
        questionId,
        submissionCode,
        timeTaken,
        languageUsed,
        submissionStatus
      );
      if (message == "unsuccessful") {
        throw error;
      }

      res.status(200).json({
        message: "Submitted Successfuly",
      });
    } catch (err) {
      next(err, req, res);
    }
  };
}

module.exports = SubmissionController;
