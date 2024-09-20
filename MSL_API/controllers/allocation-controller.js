const AllocationService = require('../services/allocation-service');

class AllocationController {
  async allocateStudent(req, res) {
    try {
      const allocation = await AllocationService.allocateStudent(req.body);
      res.status(201).json(allocation);
    } catch (error) {
      console.log("Error during allocation: ", error)
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AllocationController();
