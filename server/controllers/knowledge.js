/** Libraries */
const asyncErrorWrapper = require("express-async-handler");

/** Models */
const Directory = require("../models/Directory");

/** Functions */
const getDirectories = asyncErrorWrapper(async (req, res, next) => {
  const directories = await Directory.find().sort({ updatedAt: "desc" });

  return res.status(200).json({
    data: directories,
    message: "Fetched created directories successfully",
  });
});

const createDirectory = asyncErrorWrapper(async (req, res, next) => {
  const directory = await Directory.create(req.body);

  return res.status(200).json({
    data: directory,
    message: "Directory created successfully",
  });
});

module.exports = {
  createDirectory,
  getDirectories,
};
