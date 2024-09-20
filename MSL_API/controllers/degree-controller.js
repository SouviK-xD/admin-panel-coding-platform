const { getAllDegreesService } = require("../services/degree-service");

const getAllDegreesController = async (req, res, next)=>{
    console.log(">>Inside getAllDegreesController.. ");

    const {data , error} = await getAllDegreesService();
    if ( data == null ){
        throw error;
    }

    res.status(200).json({
        message: "Success",
        data: data,
      });
}

module.exports = {
    getAllDegreesController,
}