const Allocation = require('../models/ProjectMentorStudentMapping');

class AllocationService {
  async allocateStudent(data) {
    if (!data.projectId || !data.userId || !data.projectRole) {
      throw new Error('Missing required fields: projectId, userId and projectRole');
    }
    
    return await Allocation.create(data);
  }
}

module.exports = new AllocationService();
