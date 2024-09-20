const { sequelize } = require("../configDB");
const { Sequelize } = require("sequelize");

class QuestionService {

  // Fetch all questions
  static getAllQuestionsService = async () => {
    console.log(">>getAllQuestions..");
    try {
      const questions = await sequelize.query("SELECT * FROM questions;", {
        type: Sequelize.QueryTypes.SELECT
      });
      
      return { data: questions, error: null };
    } catch (error) {
      console.error(">>Error at getAllQuestionsService : ", error);
      return { data: null, error: error };
    }
  };

  // Fetch questions by topic and level
  static getQuestionsByTopicAndLevel = async (practice_topic_id, level) => {
    console.log(">>getQuestionsByTopicAndLevel..");
    try {
      const questions = await sequelize.query(`
          SELECT q.*
          FROM questions q
          INNER JOIN practice_topic_problem_mapping ptpm ON q.record_id = ptpm.question_id
          WHERE ptpm.practice_topic_id = ? 
            AND q.status = 'Y' 
            AND ptpm.status = 'Y' 
            AND ptpm.level = ?;
        `, {
        replacements: [practice_topic_id, level],
        type: Sequelize.QueryTypes.SELECT
      });

      return { data: questions, error: null };
    } catch (error) {
      console.error(">>Error at getQuestionsByTopicAndLevel : ", error);
      return { data: null, error: error };
    }
  };

  // Fetch questions by practice topic id
  static getQuestionsByPracticeTopicId = async (practice_topic_id) => {
    console.log(">>getQuestionsByPracticeTopicId..");
    try {
      const questions = await sequelize.query(`
          SELECT q.*
          FROM questions q
          INNER JOIN practice_topic_problem_mapping ptpm ON q.record_id = ptpm.question_id
          WHERE ptpm.practice_topic_id = ? 
            AND q.status = 'Y' 
            AND ptpm.status = 'Y';
        `, {
        replacements: [practice_topic_id],
        type: Sequelize.QueryTypes.SELECT
      });

      return { data: questions, error: null };
    } catch (error) {
      console.error(">>Error at getQuestionsByPracticeTopicId : ", error);
      return { data: null, error: error };
    }
  };



  // Fetch question details by question ID
  static getQuestionDetailsById = async (question_id, user_id) => {
    console.log(">>getQuestionDetailsById..");
    try {
      const { data: question, error: question_error } = await this.getQuestionById(question_id);
      if (!question) throw question_error;

      const { data: examples, error: example_error } = await this.getExamplesByQuesId(question_id);
      if (!examples) throw example_error;

      const { data: testcases, error: testcases_error } = await this.getTestcasesByQuesId(question_id, user_id);
      if (!testcases) throw testcases_error;

      const { data: constraints, error: constraint_error } = await this.getConstraintsByQuesId(question_id);
      if (!constraints) throw constraint_error;

      const { data: hints, error: hint_error } = await this.getHintsByQuesId(question_id);
      if (!hints) throw hint_error;

      const { data: solution, error: solution_error } = await this.getSolutionByQuesId(question_id);
      if (!solution) throw solution_error;

      return {
        data: {
          problem: question,
          examples,
          testcases,
          custom_testcases: null, // Handle custom test cases separately if needed
          constraints,
          hints,
          solution: solution[0]
        },
        error: null,
      };
    } catch (error) {
      console.error(">>Error at getQuestionDetailsById : ", error);
      return { data: null, error: error };
    }
  };

  // Create new question
  static createQuestion = async (questionData) => {
    try {
      const query = `
        INSERT INTO questions (question, description, created_by, level, status, image_path)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const params = [
        questionData.question,
        questionData.description,
        questionData.created_by,
        questionData.level,
        questionData.status,
        questionData.image_path || null, // image_path is optional
      ];

      const result = await sequelize.query(query, { replacements: params });
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Fetch specific question by ID
  static getQuestionById = async (question_id) => {
    try {
      const question = await sequelize.query(`
          SELECT * FROM questions WHERE record_id = ? AND status = 'Y';
        `, {
        replacements: [question_id],
        type: Sequelize.QueryTypes.SELECT
      });
      return { data: question[0], error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Update a question
  static updateQuestion = async (questionData) => {
    try {
      const query = `
        UPDATE questions
        SET question = ?, description = ?, modified_by = ?, level = ?, modified_at = NOW()
        WHERE record_id = ?
      `;
      const params = [
        questionData.question,
        questionData.description,
        questionData.updated_by,
        questionData.level,
        questionData.question_id,
      ];

      const result = await sequelize.query(query, { replacements: params });
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Delete question
  static deleteQuestion = async (question_id, deleted_by) => {
    try {
      console.log(`Attempting to delete question with ID: ${question_id}, Deleted by: ${deleted_by}`);
      const query = `
        UPDATE questions
        SET status = 'N', modified_by = ?, modified_at = NOW()
        WHERE record_id = ?
      `;
      const result = await sequelize.query(query, {
        replacements: [deleted_by, question_id]
      });
      console.log(`Delete operation result: ${JSON.stringify(result)}`);
      return { data: result, error: null };
    } catch (error) {
      console.error("Error in deleteQuestion service:", error);
      return { data: null, error };
    }
  };
  



  // Fetch specific question by ID
  static getQuestionById = async (question_id) => {
    console.log(">>getQuestionById..");
    try {
      const question = await sequelize.query(`
          SELECT * FROM questions WHERE record_id = ? AND status = 'Y';
        `, {
        replacements: [question_id],
        type: Sequelize.QueryTypes.SELECT
      });

      return { data: question[0], error: null };
    } catch (error) {
      console.error(">>Error at getQuestionById : ", error);
      return { data: null, error: error };
    }
  };

  

}

module.exports = QuestionService;
