const { isEmpty } = require("lodash");
const { addCollegeDegreeMap } = require("../services/college-degree-service");
const { AppError } = require("../utils/app-error");

const addCollegeDegreeMapController = async (req, res, next) => {
  console.log(">>Inside College Degree Map Controller..");

  const { college, degrees } = req.body;
  if (college == null || isEmpty(college)) {
    throw AppError("College Not provided..", 400);
  }

  if (degrees == null || isEmpty(degrees) || length(degrees) == 0) {
    throw AppError("No degree provided", 400);
  }

  const { message, error } = await addCollegeDegreeMap(college, degrees);

  //Incomplete-------------
};
