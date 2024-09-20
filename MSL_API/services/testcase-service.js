const { sequelize } = require("../configDB");

class TestCaseService {

    static addCustomTestcase = async (
        questionId,
        input,
        output,
        created_by,
      ) => {
        console.log(">>Service : addTestcase..");
        try {
          
          await sequelize
            .query(
              `INSERT INTO custom_testcases
                (question_id, input, output, created_by, status)
                VALUES(?, ?, ?, ? , 'Y');`,
              {
                replacements: [
                  
                  questionId,
                  input,
                  output,
                  created_by,
                ],
                type: sequelize.QueryTypes.RAW,
              }
            )
            .then(() => {
              console.log("Data added successfully");
              
            });
    
          return { 
            message : "successful",
            error: null,
          };

        } catch (error) {
          console.log(">>Error at addTestcase : " + error);
          return { message: 'unsuccessful', error: error };
        }
      };

      static getCustomTestcases = async (question_id, user_id) => {
        console.log(">>getCustomTestcases..");
        try {
          let data;
          await sequelize
            .query(`SELECT * FROM custom_testcases ct WHERE ct.question_id = ? AND ct.created_by = ? AND ct.status = 'Y';`, {
              replacements: [question_id,user_id],
              type: sequelize.QueryTypes.SELECT,
            })
            .then((resp) => {
              console.log("data : ", resp);
              data = resp;
            });
    
          return {
            data: data,
            error: null,
          };
        } catch (error) {
          console.log(">>Error at getCustomTestcases : " + error);
          return { data: null, error: error };
        }
      };
    

    }

module.exports = TestCaseService;