/** Libraries */
const asyncErrorWrapper = require("express-async-handler");
const fs = require("fs");
const path = require("path");

/** Models */
const Directory = require("../models/Directory");
const Document = require("../models/Document");

/** Helpers */
const CustomError = require("../helpers/errors/CustomError");

/** Functions */
const getDirectories = asyncErrorWrapper(async (req, res, next) => {
  const directories = await Directory.find();

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

const updateDirectory = asyncErrorWrapper(async (req, res, next) => {
  for (const [key, value] of Object.entries(req.body)) {
    // Check if the property exists in the Mongoose schema before updating
    if (req.directory.schema.obj[key]) {
      req.directory[key] = value;
    }
  }

  console.log(req.directory);
  await req.directory.save();

  return res.status(200).json({
    data: req.directory,
    message: "Directory updated successfully",
  });
});

const deleteDirectory = asyncErrorWrapper(async (req, res, next) => {
  const { directoryId } = req.params;
  const { documents } = req.directory;

  const records = await Document.find({ _id: { $in: documents } }).select(
    "savedName -_id"
  );

  const rootDir = path.dirname(require.main.filename);
  const uploadsDirectory = path.join(rootDir, "/public/uploads");

  // delete related document files with directory
  for (const record of records) {
    fs.unlink(path.join(uploadsDirectory, record.savedName), (err) => {
      if (err) return new CustomError("error", 404);
    });
  }

  // delete related documents from database with directory
  await Document.deleteMany({
    _id: { $in: documents },
  });

  // delete directory from database
  await Directory.deleteOne({ _id: directoryId });

  res.status(200).json({
    message: `Directory deleted successfully with directory: ${directoryId};`,
  });
});

module.exports = {
  createDirectory,
  getDirectories,
  updateDirectory,
  deleteDirectory,
};
