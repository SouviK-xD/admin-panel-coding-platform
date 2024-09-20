const StudentService = require('../services/student-service');

class StudentController {
  async addStudent(req, res) {
    try {
      const student = await StudentService.createStudent(req.body);
      res.status(201).json(student);
    } catch (error) {
      console.log("This is the error",error)
      res.status(500).json({ error: error.message });
    }
  }

  async deleteStudent(req, res) {
    try {
      await StudentService.deleteStudent(req.params.studentId);
      res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllStudents(req, res) {
    try {
      const students = await StudentService.getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new StudentController();
