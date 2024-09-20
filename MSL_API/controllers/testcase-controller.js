const Question = require("../models/question");
const User = require("../models/user");
const TestCaseService = require("../services/testcase-service");

class TestcaseController{

    static addTestcase = async (req, res, next) => {
        // #swagger.tags=['Testcase']
        // #swagger.summary = 'Add testcase for a particular user.'
        // #swagger.description = 'This API will be used to add testcase to the submissions table.'
        try {
          console.log(">>Controller : Inside addTestcase.. ");
    
          const {
            questionId,
            input,
            output,
            userId,
          } = req.body;
    
          if (userId == null || isNaN(userId)) {
            throw new AppError("Provide valid user id", 400);
          }
    
          const user = await User.findOne({ where: { user_id: userId } });
          if (user == null || user.status != "Y") {
            throw new AppError("No user found with the given userId.", 404);
          }
    
          if (questionId == null ||  isNaN(questionId)) {
            throw new AppError("Provide a valid question Id.", 400);
          }
    
          const question = await Question.findOne({
            where: { record_id: questionId },
          });
          if (question == null || question.status != "Y") {
            throw new AppError("Question not found.", 404);
          }
    
          if (input == null) {
            throw new AppError("Input is required", 400);
          }
    
          if (output == null) {
            throw new AppError("Output is required.", 400);
          }
    
    
          const { message, error } = await TestCaseService.addCustomTestcase(
            questionId,
            input,
            output,
            userId,
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

module.exports = TestcaseController;