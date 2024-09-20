const { sequelize } = require("../configDB");

const path = require("path");
const fs = require("fs");
const { AppError } = require("../utils/app-error");

const { Sequelize } = require("sequelize");

class PracticeService {
  static getAllPracticeService = async () => {
    console.log(">>getAllPracticeService..");
    try {
      let topics;
      await sequelize
        .query(
          `SELECT pm.*, pcm2.record_id as category_id , pcm2.category FROM practice_master pm 
            INNER JOIN practice_category_mapping pcm ON pm.record_id  = pcm.practice_id 
            INNER JOIN practice_category_master pcm2 ON pcm2.record_id = pcm.category_id 
            WHERE pm.status = 'Y' AND pcm.status = 'Y' AND pcm2.status = 'Y';`,
          {
            type: Sequelize.QueryTypes.SELECT,
          }
        )
        .then((data) => {
          console.log("data : ", data);
          topics = data;
        });

      return {
        data: topics,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getAllPracticeService : " + error);
      return { data: null, error: error };
    }
  };

  /// NEW SERVICE 




  static getPracticeByIdService = async (practiceId) => {
    console.log(">>getPracticeByIdService..");
    try {
      let practices;
      await sequelize
        .query(
          ` SELECT pm.*, pcm2.category FROM practice_master pm 
            INNER JOIN practice_category_mapping pcm ON pm.record_id  = pcm.practice_id 
            INNER JOIN practice_category_master pcm2 ON pcm2.record_id = pcm.category_id 
            WHERE pm.record_id = ? AND pm.status = 'Y' AND pcm.status = 'Y' AND pcm2.status = 'Y';`,
          {
            replacements: [practiceId],
            type: Sequelize.QueryTypes.SELECT,
          }
        )
        .then((data) => {
          console.log("data : ", data);
          practices = data;
        });

      return {
        data: practices,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getAllPracticeService : " + error);
      return { data: null, error: error };
    }
  };

  static getAllPracticeByCategoryIdService = async (categoryId) => {
    console.log(">>getAllPracticeByCategoryIdService..");
    try {
      let practices;
      await sequelize
        .query(
          `SELECT pm.*
      FROM practice_master pm 
      INNER JOIN practice_category_mapping pcm ON pm.record_id = pcm.practice_id 
      WHERE pcm.category_id = ? AND pm.status = 'Y' AND pcm.status = 'Y';`,
          {
            replacements: [categoryId],
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((data) => {
          console.log("data : ", data);
          practices = data;
        });

      return {
        data: practices,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getAllPracticeByCategoryIdService : " + error);
      return { data: null, error: error };
    }
  };

  static getPracticesToDisplayService = async () => {
    console.log(">>getPracticesToDisplayService..");
    try {
      let practices;
      await sequelize
        .query("SELECT * FROM practice_master where display=1;", {
          type: Sequelize.QueryTypes.SELECT,
        })
        .then((data) => {
          console.log("data : ", data);
          practices = data;
        });

      return {
        data: practices,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getPracticesToDisplayService : " + error);
      return { data: null, error: error };
    }
  };

  static getPracticesToDisplayByCategoryId = async (categoryId) => {
    console.log(">>getPracticesToDisplayByCategoryId..");
    try {
      let practices;
      await sequelize
        .query(
          `SELECT pm.*
        FROM practice_master pm 
        INNER JOIN practice_category_mapping pcm ON pm.record_id = pcm.practice_id 
        WHERE pcm.category_id = ? AND pm.display = 1 AND pm.status = 'Y' AND pcm.status = 'Y';`,
          {
            replacements: [categoryId],
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((data) => {
          console.log("data : ", data);
          practices = data;
        });

      return {
        data: practices,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getPracticesToDisplayByCategoryId : " + error);
      return { data: null, error: error };
    }
  };

  static getPracticeIcon = async (filePath) => {
    console.log(">>Inside getPracticeIcon..");
    try {
      const uploadDir = path.join(__dirname, "../uploads/images");
      const fullPath = path.join(uploadDir, filePath);
      console.log(">>Full path : ", fullPath);
      fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (err) {
          console.log("Error while accessing file : ", err);
          throw new AppError(err.message, 404);
        }
        // res.sendFile(fullPath);
      });

      console.log(">>Full path : ", fullPath);
      return {
        data: fullPath,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getPracticeIcon : " + error);
      return { data: null, error: error };
    }
  };



  static createPracticeService = async (practiceData) => {
    try {
      await sequelize.query(`
        INSERT INTO practice_master (practice_title, description, status, display, problem_count, review_ratings, learner_count, created_by, created_at)
        VALUES (:practice_title, :description, :status, :display, :problem_count, :review_ratings, :learner_count, :created_by, NOW())
      `, {
        replacements: practiceData,
        type: Sequelize.QueryTypes.INSERT,
      });

      return { success: true, error: null };
    } catch (error) {
      console.error('Error at createPracticeService:', error);
      return { success: false, error };
    }
  };

  static updatePracticeService = async (id, practiceData) => {
    try {
      await sequelize.query(`
        UPDATE practice_master
        SET practice_title = :practice_title,
            description = :description,
            status = :status,
            display = :display,
            problem_count = :problem_count,
            review_ratings = :review_ratings,
            learner_count = :learner_count,
            modified_by = :modified_by,
            modified_at = NOW()
        WHERE record_id = :id
      `, {
        replacements: { ...practiceData, id },
        type: Sequelize.QueryTypes.UPDATE,
      });

      return { success: true, error: null };
    } catch (error) {
      console.error('Error at updatePracticeService:', error);
      return { success: false, error };
    }
  };

  static deletePracticeService = async (id) => {
    try {
      await sequelize.query(`
        DELETE FROM practice_master
        WHERE record_id = :id
      `, {
        replacements: { id },
        type: Sequelize.QueryTypes.DELETE,
      });

      return { success: true, error: null };
    } catch (error) {
      console.error('Error at deletePracticeService:', error);
      return { success: false, error };
    }
  };
}

module.exports = PracticeService;
