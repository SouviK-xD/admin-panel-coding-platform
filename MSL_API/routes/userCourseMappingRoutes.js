// In routes/userCourseMappingRoutes.js
const express = require('express');
const router = express.Router();
const PracticeController = require('../controllers/practice-controller');
const UserCourseMapping  = require('../controllers/userCourseMappingController');

// Route to handle POST requests
router.post('/addUserCourseMapping', PracticeController.addUserCourseMappingController);
router.get('/learners/:id', UserCourseMapping.getLearnerCount);

router.get('/check_user_course', UserCourseMapping.check_user_course);

module.exports = router;
