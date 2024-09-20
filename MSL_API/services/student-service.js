const { StudentMaster } = require('../models/StudentMaster');

class StudentService {
  async createStudent(data) {
    // Ensure studentId, userId, and name are provided
    if (!data.studentId || !data.userId || !data.name) {
      throw new Error('studentId, userId, and name are required');
    }
    return await StudentMaster.create(data);
  }

  async deleteStudent(studentId) {
    return await StudentMaster.destroy({ where: { studentId } });
  }

  async getAllStudents() {
    return await StudentMaster.findAll();
  }
}

module.exports = new StudentService();
