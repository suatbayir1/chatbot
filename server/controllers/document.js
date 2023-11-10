/** Libraries */
const asyncErrorWrapper = require("express-async-handler");

/** Models */
const Document = require("../models/Document");

/** Functions */
const getDocuments = asyncErrorWrapper(async (req, res, next) => {
  const { directoryId } = req.params;

  const documents = await Document.find({ directory: directoryId }).sort({
    updatedAt: "desc",
  });

  return res.status(200).json({
    data: documents,
    message: `Documents fetched successfully with directory: ${directoryId}`,
  });
});

const uploadDocument = asyncErrorWrapper(async (req, res, next) => {
  const { directoryId } = req.params;

  const document = await Document.create({
    directory: directoryId,
    savedName: req.savedDocumentGeneratedName,
    originalName: req.savedDocumentOriginalName,
    mimeType: req.savedDocumentMimeType,
    status: "UPLOADED",
  });

  return res.status(200).json({
    data: document,
    message: "Document created successfully",
  });
});

module.exports = {
  uploadDocument,
  getDocuments,
};
