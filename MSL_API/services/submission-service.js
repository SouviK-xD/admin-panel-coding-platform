const { sequelize } = require("../configDB");

class SubmissionService {

  static getAllSubmissionsByUserIdAndQuesId = async (userId, questionId) => {
    console.log(">>Service : getAllSubmissionsByUserIdAndQuesId..");
    try {
      let result;
      await sequelize
        .query(
          `SELECT * FROM submissions s WHERE s.user_id = ? AND s.question_id = ? ORDER by s.created_at DESC;`,
          {
            replacements: [userId, questionId],
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((data) => {
          console.log("data : ", data);
          result = data;
        });

      return {
        data: result,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getAllSubmissionsByUserIdAndQuesId : " + error);
      return { data: null, error: error };
    }
  };

  static getAllSubmissionsByUserId = async (userId) => {
    console.log(">>Service : getAllSubmissionsByUserId..");
    try {
      let result;
      await sequelize
        .query(
          `SELECT s.*, q.question  FROM submissions s 
          INNER JOIN questions q ON q.record_id  = s.question_id 
          WHERE s.user_id = ? AND s.status='Y' ORDER by s.created_at DESC;`,
          {
            replacements: [userId],
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((data) => {
          console.log("data : ", data);
          result = data;
        });

      return {
        data: result,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getAllSubmissionsByUserId : " + error);
      return { data: null, error: error };
    }
  };

  static addSubmission = async (
    userId,
    questionId,
    submissionCode,
    timeTaken,
    languageUsed,
    submissionStatus
  ) => {
    console.log(">>Service : addSubmission..");
    try {
      
      await sequelize
        .query(
          `INSERT INTO submissions
            (user_id, question_id, submission_code, time_taken, language_used, submission_status,  created_by,  status)
            VALUES(?, ?, ?, ?, ?, ?,?, 'Y');`,
          {
            replacements: [
              userId,
              questionId,
              submissionCode,
              timeTaken,
              languageUsed,
              submissionStatus,
              userId,
            ],
            type: sequelize.QueryTypes.RAW,
          }
        )
        .then(() => {
          console.log("Data added successfully");
          
        });

      return {
        
        message : "successful",
        error: null,
      };
    } catch (error) {
      console.log(">>Error at addSubmission : " + error);
      return { message: 'unsuccessful', error: error };
    }
  };
}


module.exports = SubmissionService
