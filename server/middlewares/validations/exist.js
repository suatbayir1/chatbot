// Libraries
const asyncErrorWrapper = require("express-async-handler");

// Helpers
const CustomError = require("../../helpers/errors/CustomError");

// Models
const Directory = require("../../models/Directory");

const isDirectoryExists = asyncErrorWrapper(async (req, res, next) => {
  const { directoryId } = req.params;

  const exists = await Directory.findById(directoryId);

  if (!exists) {
    return next(
      new CustomError("There is no such Directory with that id", 404)
    );
  }

  next();
});

module.exports = {
  isDirectoryExists,
};
