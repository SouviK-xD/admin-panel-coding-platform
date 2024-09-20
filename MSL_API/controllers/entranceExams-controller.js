const { getAllEntranceExamsService } = require("../services/entranceExams-service");
const { AppError } = require("../utils/app-error");

const getAllEntranceExamController = async (req, res, next)=>{
    console.log(">>Inside getAllEntranceExamController.. ");

    const {data , error} = await getAllEntranceExamsService();
    if ( data == null ){
        throw error;
    }

    res.status(200).json({
        message: "Success",
        data: data,
      });
}

module.exports = {
    getAllEntranceExamController,
}