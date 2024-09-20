const errorHandler = (error, req, res, next) => {
  console.log(">>Inside Error Handler");
  error.message = error.message || "Internal Server Error";
  error.statusCode = error.statusCode || 500;

  if (
    error.name == "SequelizeValidationError" ||
    error.name == "SequelizeUniqueConstraintError"
  ) {
    console.log("Validation Error : " + error);
    return res.status(400).json({
      error: error.errors[0].message,
    });
  }

  return res.status(error.statusCode).json({ error: error.message });
};

module.exports = {
  errorHandler,
};
