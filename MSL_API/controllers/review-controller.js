const ReviewService = require("../services/review-service");

class ReviewController {
  // Get all reviews for a specific practice
  static getAllReviews = async (req, res, next) => {
    const practiceId = req.params.practiceId;
    console.log("this is  getAllReviewsController", practiceId);

    try {
      const result = await ReviewService.getAllReviewsService(practiceId);
      if (result.error) {
        return res.status(500).json({ message: "Error retrieving reviews", error: result.error });
      }
      res.status(200).json({ data: result.data });
    } catch (error) {
      next(error);
    }
  };

  // Get a review by its ID
  static getReviewById = async (req, res, next) => {
    const reviewId = req.params.reviewId;
    console.log("this is  getReviewByIdController");

    try {
      const result = await ReviewService.getReviewByIdService(reviewId);
      if (result.error) {
        return res.status(500).json({ message: "Error retrieving review", error: result.error });
      }
      res.status(200).json({ data: result.data });
    } catch (error) {
      next(error);
    }
  };

  // Delete a review
  static deleteReview = async (req, res, next) => {
    const reviewId = req.params.reviewId;
    console.log("this is deleteReviewController");

    try {
      const result = await ReviewService.deleteReviewService(reviewId);
      if (result.error) {
        return res.status(500).json({ message: "Error deleting review", error: result.error });
      }
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ReviewController;
