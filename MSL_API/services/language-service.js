const { sequelize } = require("../configDB");

class LanguageService {

  static getAllLanguageService = async () => {
    console.log(">>getAllLanguageService..");
    try {
      let data;
      await sequelize
        .query("SELECT * FROM language_master;", {
          type: sequelize.QueryTypes.SELECT,
        })
        .then((response) => {
          console.log("data : ", response);
          data = response;
        });

      return {
        data: data,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getAllLanguageService : " + error);
      return { data: null, error: error };
    }
  };


  static getLanguageByName = async (language) => {
    console.log(">>getLanguageByName..");
    try {
      let data;
      await sequelize
        .query(`SELECT * FROM language_master WHERE language = ?;`, {
            replacements : [language],
          type: sequelize.QueryTypes.SELECT,
        })
        .then((response) => {
          console.log("data : ", response);
          data = response;
        });

      return {
        data: data,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getLanguageByName : " + error);
      return { data: null, error: error };
    }
  };

  static getLanguageByPracticeId = async (practice_id) => {
    console.log(">>getLanguageByPracticeId..");
    try {
      let data;
      await sequelize
        .query(`SELECT lm.*
                FROM language_master lm
                INNER JOIN language_practice_mapping lpm ON lm.record_id  = lpm.language_id 
                WHERE lpm.practice_id = ? AND lpm.status = 'Y' AND lm.status = 'Y' ;`,
            {
            replacements : [practice_id],
            type: sequelize.QueryTypes.SELECT,
            })
        .then((response) => {
          console.log("data : ", response);
          data = response[0];
        });

      return {
        data: data,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getLanguageByPracticeId : " + error);
      return { data: null, error: error };
    }
  };
  
  
}

module.exports = LanguageService;
