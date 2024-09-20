const { isEmpty } = require("lodash");
const TopicService = require("../services/topic-service");
const { AppError } = require("../utils/app-error");
const path = require("path");

class TopicController {
  static getAllTopicsController = async (req, res, next) => {
    // #swagger.tags=['Topic']
    // #swagger.summary = 'Get all topics.'
    // #swagger.description = 'This API will be used to get all topics in the database.'
    try {
      console.log(">>Inside getAllQuestionsController.. ");

      const { data, error } = await TopicService.getAllTopicsService();
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

  static getTopicsByPracticeIdController = async (req, res, next) => {
    // #swagger.tags=['Topic']
    // #swagger.summary = 'Get all topics of a particular practice.'
    // #swagger.description = 'This API will be used to get all topics mapped to the practiceId.'
    try {
      console.log(">>Inside getAllQuestionsController.. ");
      const { practiceId } = req.body;
      if (practiceId == null) {
        throw new AppError("Practice Id is required.", 400);
      }
      const { data, error } = await TopicService.getTopicsByPracticeIdService(
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

  static createTopicController = async (req, res, next) => {
    try {
      const newTopic = { ...req.body };
      const { data, error } = await TopicService.createTopicService(newTopic);
      if (!data) throw error;
  
      res.status(201).json({ message: "Topic created successfully" });
    } catch (err) {
      next(err, req, res);
    }
  };
  
  // Controller to update an existing topic
  static updateTopicController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedTopic = { ...req.body}; // Assuming req.user.userId holds the user ID
      const { data, error } = await TopicService.updateTopicService(id, updatedTopic);
      if (!data) throw error;
  
      res.status(200).json({ message: "Topic updated successfully" });
    } catch (err) {
      next(err, req, res);
    }
  };
  
  // Controller to delete a topic
  static deleteTopicController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data, error } = await TopicService.deleteTopicService(id);
      if (!data) throw error;
  
      res.status(200).json({ message: "Topic deleted successfully" });
    } catch (err) {
      next(err, req, res);
    }
  };
}

module.exports = TopicController;
