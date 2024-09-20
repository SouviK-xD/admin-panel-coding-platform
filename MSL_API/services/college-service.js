const { College } = require("../models/college");
const { sequelize } = require("../configDB");

const getCollegesService = async (filter) => {
  console.log(">>GetCollegesService..");
  try {
    // let queryConditions = {};
    // if (filter) {
    //   for (const key in filter) {
    //     queryConditions[key] = filter[key];
    //   }
    // }
    

    

    console.log("Filter --> ",filter);
    let query = "SELECT * FROM colleges";
    if (filter) {
      const conditions = generateQuery(filter);
      if (conditions){
        console.log("Extracted conditions .. ");
        query = `${query} WHERE ${conditions}`;
        console.log("Query Generated... ");
      }
    }

    console.log("---> QueryGenerated : ", query);

    var colleges;
    await sequelize
      .query(query)
      .then((data) => {
        console.log("---> colleges : ", data);
        colleges = data[0];
      })
      
    return {
      colleges: colleges,
      error: null,
    };
  } catch (error) {
    console.log(">>Error at GetCollegesService : " + error);
    return { colleges: null, error: error };
  }
};

const getStatesService = async () => {
  console.log(">>Inside getStatesService...");
  try {
    var states = [];
    await sequelize
      .query("SELECT DISTINCT state FROM colleges", { raw: true })
      .then(function (data) {
        console.log("Data extracted : ", data);
        states = data[0].map((val) => {
          return val.state;
        });
      });

    console.log("states : ", states);
    return {
      data: states,
      error: null,
    };
  } catch (error) {
    return { data: null, error: error };
  }
};

const getDistrictsService = async () => {
  console.log(">>Inside getDistrictsService...");
  try {
    var districts = [];
    await sequelize
      .query("SELECT DISTINCT district FROM colleges", { raw: true })
      .then(function (data) {
        console.log("Data extracted : ", data);
        districts = data[0].map((val) => {
          return val.district;
        });
      });

    console.log("districts : ", districts);
    return {
      data: districts,
      error: null,
    };
  } catch (error) {
    return { data: null, error: error };
  }
};

const getUniversitiesService = async () => {
  console.log(">>Inside getUniversitiesService...");
  try {
    var universities = [];
    await sequelize
      .query("SELECT DISTINCT university_name FROM colleges", { raw: true })
      .then(function (data) {
        console.log("Data extracted : ", data);
        universities = data[0].map((val) => {
          return val.university_name;
        });
      });

    console.log("universities : ", universities);
    return {
      data: universities,
      error: null,
    };
  } catch (error) {
    return { data: null, error: error };
  }
};

const generateQuery = (data) => {
  const conditions = [];
  if (data == null || data == undefined) {
    console.log("Null or Undefined data passed in generate Query..");
    return "";
  }

  Object.keys(data).forEach((key) => {
    const values = data[key].map((value) => `'${value}'`).join(", ");
    if (values){
      conditions.push(`${key} IN (${values})`);
    }
  });

  return conditions.join(" AND ");
};

const getCollegeByName = async (collegeName)=>{
  try{
    const collegeDetails = await College.findOne({ where : { college_name : collegeName}});
    if ( collegeDetails != null ){
      return {data : collegeDetails, error : null};
    }
    else{
      return {data : null , error : "No data found"};
    }
  }
  catch(err){
    return {data : null, error : err};
  }

} 

module.exports = {
  getCollegesService,
  getDistrictsService,
  getStatesService,
  getUniversitiesService,
  getCollegeByName,
};
