const multer = require("multer");
const path = require("path");
const CustomError = require("../../helpers/errors/CustomError");
const { v4: uuidv4 } = require("uuid");

// Storage
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    const rootDir = path.dirname(require.main.filename);
    cb(null, path.join(rootDir, "/public/uploads"));
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    req.savedDocumentOriginalName = file.originalname;
    req.savedDocumentMimeType = file.mimetype;
    req.savedDocumentGeneratedName = `${uuidv4()}.${extension}`;
    cb(null, req.savedDocumentGeneratedName);
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  let allowedMimeTypes = [
    "application/xml",
    "application/octet-stream",
    "application/pdf",
  ];

  console.log(file);

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new CustomError("Please provide a valid file", 400), false);
  }

  return cb(null, true);
};

const uploadDocumentMiddleware = multer({ storage, fileFilter });

module.exports = uploadDocumentMiddleware;
