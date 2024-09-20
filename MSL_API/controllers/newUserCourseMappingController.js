// import { addNewUserCourseMapping } from '../services/NewUserCourseMappingService';

// const addUserCourseMapping = async (req, res) => {
//     try {
//         const { user_id, record_id, avatar_name } = req.body;
//         if (!user_id || !record_id || !avatar_name) {
//             return res.status(400).json({ error: 'Missing required fields' });
//         }

//         const newEntry = await addNewUserCourseMapping({ user_id, record_id, avatar_name });
//         res.status(201).json(newEntry);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export default {
//     addUserCourseMapping,
// };
