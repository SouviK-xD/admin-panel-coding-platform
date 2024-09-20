const {
  getCollegesService,
  getDistrictsService,
  getStatesService,
  getUniversitiesService,
} = require("../services/college-service");

const getCollegesController = async (req, res, next) => {
  console.log("Inside GetCollegeController ... ");
  const { filter } = req.body;
  const { colleges, error } = await getCollegesService(filter);
  //   console.log("College in controller --- > " + colleges);

  if (colleges == null) {
    throw error;
  }
  res.status(200).json({
    message: "Success",
    colleges: colleges,
  });
};

const getDistrictsController = async (req, res, next) => {
  console.log(">>Inside getDistrictsController...");
  const { data, error } = await getDistrictsService();
  if (data == null) {
    throw error;
  }

  console.log("Districts : ", data);

  res.status(200).json({
    message: "Success",
    districts: data,
  });
};

const getStatesController = async (req, res, next) => {
  console.log(">>Inside getDistrictsController...");
  const { data, error } = await getStatesService();
  if (data == null) {
    throw error;
  }

  console.log("States : ", data);

  res.status(200).json({
    message: "Success",
    data: data,
  });
};

const getUniversitiesController = async (req, res, next) => {
  console.log(">>Inside getDistrictsController...");
  const { data, error } = await getUniversitiesService();
  if (data == null) {
    throw error;
  }

  console.log("Universities : ", data);

  res.status(200).json({
    message: "Success",
    data: data,
  });
};

module.exports = {
  getCollegesController,
  getDistrictsController,
  getStatesController,
  getUniversitiesController,
};
