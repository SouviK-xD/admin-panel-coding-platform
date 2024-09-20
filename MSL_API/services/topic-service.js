const { sequelize } = require("../configDB");

class TopicService {
  static getAllTopicsService = async () => {
    console.log(">>getAllTopicsService..");
    try {
      let topics;
      await sequelize
        .query("SELECT * FROM topic_master;", {
          type: sequelize.QueryTypes.SELECT,
        })
        .then((data) => {
          console.log("data : ", data);
          topics = data;
        });

      return {
        data: topics,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getAllTopicsService : " + error);
      return { data: null, error: error };
    }
  };

  static getTopicsByPracticeIdService = async (practiceId) => {
    console.log(">>getAllTopicsService..");
    try {
      let topics;
      await sequelize
        .query(
          `SELECT tm.*,ptm.record_id as practice_topic_id
          FROM topic_master tm 
          INNER JOIN practice_topic_mapping ptm  ON tm.record_id = ptm.topic_id  
          WHERE ptm.practice_id = ? AND  tm.status = 'Y' AND ptm.status = 'Y';`,
          {
            replacements: [practiceId],
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((data) => {
          console.log("data : ", data);
          topics = data;
        });

      return {
        data: topics,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getAllTopicsService : " + error);
      return { data: null, error: error };
    }
  };

  static getTopicsByIdService = async (topicId) => {
    console.log(">>getTopicsByIdService..");
    try {
      let topics;
      await sequelize
        .query(
          `SELECT *
          FROM topic_master tm 
          WHERE tm.record_id = ? AND  tm.status = 'Y';`,
          {
            replacements: [topicId],
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((data) => {
          console.log("data : ", data);
          topics = data;
        });

      return {
        data: topics,
        error: null,
      };
    } catch (error) {
      console.log(">>Error at getAllTopicsService : " + error);
      return { data: null, error: error };
    }
  };


  static createTopicService = async (newTopic) => {
    try {
      await sequelize.query(
        "INSERT INTO topic_master (topic, status, created_by) VALUES (?, 'Y', ?)",
        { replacements: [newTopic.topic, newTopic.created_by], type: sequelize.QueryTypes.INSERT }
      );
      return { data: true, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  };
  
  // Update an existing topic
  static updateTopicService = async (topicId, updatedTopic) => {
    try {
      await sequelize.query(
        "UPDATE topic_master SET topic = ?, status = ?, modified_by = ? WHERE record_id = ?",
        { replacements: [updatedTopic.topic, updatedTopic.status, updatedTopic.modified_by, topicId], type: sequelize.QueryTypes.UPDATE }
      );
      return { data: true, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  };
  
  // Delete a topic
  static deleteTopicService = async (topicId) => {
    try {
      await sequelize.query(
        "DELETE FROM topic_master WHERE record_id = ?",
        { replacements: [topicId], type: sequelize.QueryTypes.DELETE }
      );
      return { data: true, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  };



  
}

module.exports = TopicService;
