const { UserCourseMapping } = require('../models/userCourseMapping');

// Controller to get the count of learners for a given course ID
exports.getLearnerCount = async (req, res) => {
    try {
        const courseId = req.params.id;
        const count = await UserCourseMapping.count({ where: { course_id: courseId } });
        res.status(200).json({ learnerCount: count });
    } catch (error) {
        console.error('Error fetching learner count:', error);
        res.status(500).json({ error: 'Failed to fetch learner count' });
    }
};

// Controller to get all mappings for a given user ID
exports.getMappingsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const mappings = await UserCourseMapping.findAll({ where: { user_id: userId } });
        res.status(200).json({ data: mappings });
    } catch (error) {
        console.error('Error fetching mappings:', error);
        res.status(500).json({ error: 'Failed to fetch user mappings' });
    }
};
exports.check_user_course = async (req, res) => {
    try {
        const courseId = req.query.courseId;
        const userId = req.query.userId;
        console.log("first",courseId)
        const count = await UserCourseMapping.count({ where: { course_id: courseId,user_id:userId } });
        if(count){
            res.status(200).json({ data: true });
        }
        else{
            res.status(200).json(false);
        }
        
    } catch (error) {
        console.error('Error fetching learner count:', error);
        res.status(500).json({ error: 'Failed to fetch learner count' });
    }
};
