const { sequelize } = require("../configDB");

const getAllEntranceExamsService = async () => {
    console.log(">>getAllEntranceExamService..");
    try {
     
        let entranceExams;
      await sequelize.query('SELECT * FROM entrance_exams;',{type: Sequelize.QueryTypes.SELECT,}).then((data)=>{
        console.log("data : ", data);
        entranceExams = data;
      });
        
      return {
        data: entranceExams,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at GetCollegesService : " + error);
      return { data: null, error: error };
    }
  };

  module.exports = {
    getAllEntranceExamsService,
  }