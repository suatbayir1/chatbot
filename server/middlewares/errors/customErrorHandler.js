const CustomError = require("../../helpers/errors/CustomError");

const customErrorHandler = (err, req, res, next) => {
  let customError = err;

  if (err.name === "SyntaxError") {
    customError = new CustomError("Unexpected Syntax", 400);
  }

  if (err.name === "ValidationError") {
    customError = new CustomError(err.message, 400);
  }

  if (err.name === "CastError") {
    customError = new CustomError("Please provide a valid id", 400);
  }

  if (err.code === 11000) {
    customError = new CustomError(
      "Duplicate Key Found : Check your input",
      400
    );
  }

  if (err.status === 400) {
    customError = new CustomError(err.message, err.status);
  }

  res.status(customError.status || 500).json({
    success: false,
    message: customError.message,
  });
};

module.exports = customErrorHandler;
