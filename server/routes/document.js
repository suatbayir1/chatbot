// Libraries
const express = require("express");
const router = express.Router();

// Controllers
const { uploadDocument, getDocuments } = require("../controllers/document");

// Middlewares
const uploadDocumentMiddleware = require("../middlewares/libraries/uploadDocument");
const { isDirectoryExists } = require("../middlewares/validations/exist");

// Routes
router.get("/:directoryId/documents", [isDirectoryExists], getDocuments);

router.post(
  "/:directoryId/upload",
  [isDirectoryExists, uploadDocumentMiddleware.single("file")],
  uploadDocument
);

module.exports = router;
