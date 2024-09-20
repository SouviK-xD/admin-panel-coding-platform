const express = require('express')

const TopicController = require('../controllers/topic-controller')
const QuestionController = require('../controllers/question-controller')
const PracticeController = require('../controllers/practice-controller')
const PracticeTopicMappingController = require('../controllers/practice-topic-controller')
const LanguageController = require('../controllers/language-controller')
const SubmissionController = require('../controllers/submission-controller')
const { jwtAuthMiddlerware } = require('../middleware/jwt-authentication')
const UserController = require('../controllers/user-controller')
const CourseController = require('../controllers/course-controller')
const CategoryController = require('../controllers/category-controller')
const TestcaseController = require('../controllers/testcase-controller')
const userCourseMappingController = require('../controllers/userCourseMappingController');
const MentorController = require('../controllers/mentor-controller');
const StudentController = require('../controllers/student-controller');
const AllocationController = require('../controllers/allocation-controller');

const ReviewController = require('../controllers/review-controller');



const codingRouter = express.Router()



//------------------------ Question Routes ------------------------------------------------------
codingRouter.get('/questions', QuestionController.getAllQuestionsController);
codingRouter.post('/questionsByTopicAndLevel', QuestionController.getQuestionByTopicAndLevel);
codingRouter.post('/questionsDetails', jwtAuthMiddlerware, QuestionController.getQuestionDetails);
codingRouter.post('/questionByPracticeTopicId', QuestionController.getQuestionByPracticeTopicId);
codingRouter.post('/questionsByPracticeIdAndTopicId', QuestionController.getQuestionByPracticeIdAndTopicId);
codingRouter.post("/questions", QuestionController.createQuestion);
codingRouter.put("/questions/:record_id", QuestionController.editQuestion);
codingRouter.delete("/questions/:record_id", QuestionController.deleteQuestion);



//------------------------ Topic Routes ------------------------------------------------------


codingRouter.get('/topics', TopicController.getAllTopicsController)
codingRouter.post(
  '/topicsByPracticeId',
  TopicController.getTopicsByPracticeIdController
)

// codingRouter.get('/topics/:id', TopicController.getTopicsByIdController); // Fetch a single topic by ID
codingRouter.post('/topics', TopicController.createTopicController); // Create a new topic
codingRouter.put('/topics/:id', TopicController.updateTopicController); // Update an existing topic by ID
codingRouter.delete('/topics/:id', TopicController.deleteTopicController); // Delete a topic by ID

//------------------------ Practice Routes ------------------------------------------------------

codingRouter.get('/practices', PracticeController.getAllPracticesController)
codingRouter.post('/create/practice', PracticeController.createPracticeController);
codingRouter.put('/update/:id/practice', PracticeController.updatePracticeController);
codingRouter.delete('/delete/:id/practice', PracticeController.deletePracticeController);




codingRouter.get(
  '/practicesToDisplay',
  PracticeController.getPracticesToDisplayController
)

codingRouter.get('/learners/count/:courseId', userCourseMappingController.getLearnerCount);
codingRouter.get('/mappings/:userId', userCourseMappingController.getMappingsByUserId);

codingRouter.post(
  '/practiceToDisplayByCategoryId',
  PracticeController.getPracticesToDisplayByCategoryIdController
)
codingRouter.post(
  '/practicesByCategoryId',
  PracticeController.getAllPracticesByCategoryIdController
)
codingRouter.post('/practiceById', PracticeController.getPracticeByIdController)

codingRouter.post(
  '/getPracticeAndTopicByPracticeTopicId',
  PracticeTopicMappingController.getTopicsAndPracticeByPracticeIdController
)

codingRouter.post('/addUserCourseMapping', PracticeController.addUserCourseMappingController);
// 
// codingRouter.post('/addUserCourseMapping', userCourseMappingController.addUserCourseMapping);



//------------------------ Language Routes ------------------------------------------------------

codingRouter.get('/getAllLanguages', LanguageController.getAllLanguages)
codingRouter.post('/getLanguageByName', LanguageController.getLanguageByName)
codingRouter.post(
  '/getLanguageByPracticeId',
  LanguageController.getLanguageByPracticeId
)

//------------------------ Submission Routes ------------------------------------------------------


codingRouter.post(
  '/getSubmissionsByUserIdAndQuestionId',
  jwtAuthMiddlerware,
  SubmissionController.getAllSubmissionsByUserIdAndQuesId
)
codingRouter.post(
  '/getSubmissionsByUserId',
  jwtAuthMiddlerware,
  SubmissionController.getAllSubmissionsByUserId
)
codingRouter.post(
  '/addSubmission',
  jwtAuthMiddlerware,
  SubmissionController.addSubmission
)

//------------------------ User Details Routes ------------------------------------------------------

// codingRouter.post("/userDetailsById", (UserController.getUserDetailsById));
// codingRouter.post(
//   '/updateUserDetails',
//   jwtAuthMiddlerware,
//   UserController.updateUserDetails
// )

codingRouter.post('/users', UserController.createUser);
codingRouter.get('/userDetails', UserController.getAllUserDetails);
codingRouter.get('/users/:user_id', UserController.getUserById);
codingRouter.put('/users/:user_id', UserController.updateUser);
codingRouter.delete('/users/:user_id', UserController.deleteUser);



//------------------------ Course Routes ------------------------------------------------------

codingRouter.get('/courses', CourseController.getAllCourses)
codingRouter.get('/coursesToDisplay', CourseController.getCoursesToDisplay)

codingRouter.post('/courses', CourseController.createCourse);     // Create a new course
codingRouter.put('/courses/:course_id', CourseController.updateCourse);  // Update a course
codingRouter.delete('/courses/:course_id', CourseController.deleteCourse);  // Delete a course

//------------------------ Category Routes ------------------------------------------------------

codingRouter.get('/courseCategories', CategoryController.getCourseCategories)
codingRouter.get('/practiceCategories', CategoryController.getPracticeCategories)


//------------------------ Testcase Routes ------------------------------------------------------

codingRouter.post(
  '/addTestcase',
  jwtAuthMiddlerware,
  TestcaseController.addTestcase
)


//!   REVIEW ROUTES


//------------------------ Review Routes ------------------------------------------------------

codingRouter.get("/reviews/:practiceId", ReviewController.getAllReviews);    // Get reviews by practiceId
codingRouter.get("/reviews/id/:reviewId", ReviewController.getReviewById);    // Get review by reviewId
codingRouter.delete("/reviews/:reviewId", ReviewController.deleteReview);    // Delete a review 



//* MENTOR ROUTES

codingRouter.get('/mentors', MentorController.getAllMentors);
codingRouter.post('/mentors', MentorController.addMentor);
codingRouter.delete('/mentors/:mentorId', MentorController.deleteMentor);

//* STUDENT ROUTES

codingRouter.get('/students', StudentController.getAllStudents);
codingRouter.post('/students', StudentController.addStudent);
codingRouter.delete('/students/:studentId', StudentController.deleteStudent);


//* ALLOCATION ROUTES

codingRouter.post('/allocate', AllocationController.allocateStudent);


module.exports = codingRouter
