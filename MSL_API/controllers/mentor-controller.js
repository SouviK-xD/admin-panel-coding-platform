const MentorService = require('../services/mentor-service');

class MentorController {
  async addMentor(req, res) {
    try {
      const mentor = await MentorService.createMentor(req.body);
      res.status(201).json(mentor);
    } catch (error) {
      console.log("This is the error",error)
      res.status(500).json({ error: error.message });
    }
  }

  async deleteMentor(req, res) {
    try {
      await MentorService.deleteMentor(req.params.mentorId);
      res.status(200).json({ message: 'Mentor deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllMentors(req, res) {
    try {
      const mentors = await MentorService.getAllMentors();
      res.status(200).json(mentors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new MentorController();
