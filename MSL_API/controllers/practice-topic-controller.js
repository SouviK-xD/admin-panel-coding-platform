const PracticeService = require("../services/practice-service");
const PracticeTopicService = require("../services/practice-topic-service");
const TopicService = require("../services/topic-service");
const { AppError } = require("../utils/app-error");

class PracticeTopicMappingController {
  static getTopicsAndPracticeByPracticeIdController = async (
    req,
    res,
    next
  ) => {

    try {
      console.log(">>Inside getTopicsAndPracticeByPracticeIdController.. ");
      const { practiceTopicId } = req.body;
      if (practiceTopicId == null) {
        throw new AppError("Practice Topic Mapping Id is required.", 400);
      }

      const { data: result, error: mappingError } =
        await PracticeTopicService.getPracticeAndTopicIdById(practiceTopicId);

      if (result == null) {
        throw mappingError;
      }
      console.log("Result ", result);
      if (result.topic_id == null) {
        throw new AppError("No topic_id in the result", 400);
      }

      const { data: topics, error: topicError } =
        await TopicService.getTopicsByIdService(result.topic_id);

      if (topics == null) {
        throw topicError;
      }
      console.log("Topic : ", topics);
      const { data: practice, error: practiceError } =
        await PracticeService.getPracticeByIdService(result.practice_id);

      if (practice == null) {
        throw practiceError;
      }
      console.log("Practice : ", practice);
      const data = {
        practice: practice[0],
        topic: topics[0],
      };

      res.status(200).json({
        message: "Success",
        data: data,
      });
    } catch (err) {
      next(err, req, res);
    }
  };
}

module.exports = PracticeTopicMappingController;
