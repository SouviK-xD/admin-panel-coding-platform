const { MentorMaster } = require('../models/MentorMaster');
class MentorService {
  async createMentor(data) {
    // Ensure mentorId and userId are provided
    if (!data.mentorId || !data.userId || !data.name) {
      console.log(data)

      throw new Error('mentorId, userId, and name are required');
    }
    return await MentorMaster.create(data);
  }

  async deleteMentor(mentorId) {
    return await MentorMaster.destroy({ where: { mentorId } });
  }

  async getAllMentors() {
    return await MentorMaster.findAll();
  }
}

module.exports = new MentorService();
