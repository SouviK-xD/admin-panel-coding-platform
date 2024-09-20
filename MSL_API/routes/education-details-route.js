const express = require("express");
const { tryCatch } = require("../utils/try-catch");
const {
    getCollegesController,
    getDistrictsController,
    getStatesController,
    getUniversitiesController,
  } = require("../controllers/college-controller");
  const {
    getAllEntranceExamController,
  } = require("../controllers/entranceExams-controller");
  const { getAllDegreesController } = require("../controllers/degree-controller");


const educationRouter = express.Router();

educationRouter.post("/colleges", getCollegesController);
educationRouter.get("/districts", tryCatch(getDistrictsController));
educationRouter.get("/states", tryCatch(getStatesController));
educationRouter.get("/universities", tryCatch(getUniversitiesController));
educationRouter.get("/entranceExams", tryCatch(getAllEntranceExamController));
educationRouter.get("/degrees", tryCatch(getAllDegreesController));

module.exports = educationRouter;