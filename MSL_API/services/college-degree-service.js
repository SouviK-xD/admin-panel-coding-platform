const { isEmpty } = require("lodash");
const { CollegeDegreeMapping } = require("../models/college-degree-map");
const { getCollegeByName } = require("./college-service");
const { getDegreeByName } = require("./degree-service");

const addCollegeDegreeMap = async (college, degrees) => {
  try {
    
    const { data: collegeDetails, error: collegeError } = await getCollegeByName(college);
    if (data == null) {
      throw collegeError;
    }
    let message = "";

    for (const degree of degrees) {
      const { data: degreeDetail, error: degreeError } = await getDegreeByName( degree );
      if (degreeDetail == null) {
        message += degree + " : " + degreeError;
      }

      const collegDegreeMap = await CollegeDegreeMapping.create({
        college_id: collegeDetails.college_id,
        degree_id: degreeDetail.degree_id,
      });
    }

    if ( isEmpty(message) ){
        message = 'College-Degree Mapping done successfuly';
    }

    return {message : message, error : null};
  } catch (error) {
    return {message : "Error occurred", error : error};
  }
};


module.exports = {
    addCollegeDegreeMap,
}