const { sequelize } = require("../configDB");

class ReviewService {
  // Fetch all reviews based on practice ID
  static getAllReviewsService = async (practiceId) => {
    console.log(" this is getAllReviewsService.., practiceID :",  practiceId);
    try {
      const reviews = await sequelize.query(
        `SELECT record_id, name, comment, rating, user_id, created_at, modified_at 
         FROM review_master 
         WHERE practice_id = ?;`,
        {
          replacements: [practiceId],
          type: sequelize.QueryTypes.SELECT,
        }
      );
      console.log("Review data: ", reviews);
      return { data: reviews, error: null };
    } catch (error) {
      console.error("Error at getAllReviewsService:", error);
      return { data: null, error: error };
    }
  };

  // Fetch review by ID
  static getReviewByIdService = async (reviewId) => {
    console.log(" this is getReviewByIdService..");
    try {
      const review = await sequelize.query(
        `SELECT record_id, name, comment, rating, user_id, created_at, modified_at 
         FROM review_master 
         WHERE record_id = ?;`,
        {
          replacements: [reviewId],
          type: sequelize.QueryTypes.SELECT,
        }
      );
      console.log("Review data by ID: ", review);
      return { data: review, error: null };
    } catch (error) {
      console.error("Error at getReviewByIdService:", error);
      return { data: null, error: error };
    }
  };

  // Delete a review
  static deleteReviewService = async (reviewId) => {
    console.log("this is deleteReviewService..");
    try {
      await sequelize.query(
        `DELETE FROM review_master WHERE record_id = ?;`,
        {
          replacements: [reviewId],
          type: sequelize.QueryTypes.DELETE,
        }
      );
      return { data: true, error: null };
    } catch (error) {
      console.error("Error at deleteReviewService:", error);
      return { data: null, error: error };
    }
  };
}

module.exports = ReviewService;
