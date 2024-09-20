const { sequelize } = require("../configDB");

class PracticeTopicService {
  static getPracticeAndTopicIdById = async (practiceTopicId) => {
    console.log(">>getAllTopicsService..");
    try {
      let data;
      await sequelize
        .query(
          `SELECT *
            FROM practice_topic_mapping 
            WHERE record_id = ? AND  status = 'Y';`,
          {
            replacements: [practiceTopicId],
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((result) => {
          console.log("data : ", result);
          data = result;
        });

      return {
        data: data[0],
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getAllTopicsService : " + error);
      return { data: null, error: error };
    }
  };
}

module.exports = PracticeTopicService;
