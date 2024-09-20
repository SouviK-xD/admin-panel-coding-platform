const { sequelize } = require("../configDB");
const { Degree } = require("../models/degree");

const getAllDegreesService = async () => {
  console.log(">>getAllEntranceExamService..");
  try {
    let degrees;
    await sequelize.query("SELECT * FROM degree;").then((data) => {
      console.log("degrees : ", data);
      degrees = data[0];
    });

    return {
      data: degrees,
      error: null,
    };
  } catch (error) {
    console.log(">>Error at GetDegreesService : " + error);
    return { data: null, error: error };
  }
};

const getDegreeByName = async (degree) => {
  try {
    const extracted_degree = await Degree.findOne({
      where: { degree: degree },
    });
    if (extracted_degree != null) {
      return { data: extracted_degree, error: null };
    } else {
      return { data: null, error: "No Degree found" };
    }
  } catch (error) {
    console.log(">>Error at getDegreeByName : ", error);
    return { data: null, error: error };
  }
};

module.exports = {
  getAllDegreesService,
  getDegreeByName,
};
