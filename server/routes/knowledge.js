// Libraries
const express = require("express");
const router = express.Router();

// Controllers
const {
  getDirectories,
  createDirectory,
  updateDirectory,
  deleteDirectory,
} = require("../controllers/knowledge");

// Middlewares
const { isDirectoryExists } = require("../middlewares/validations/exist");

// Routes
router.get("/getDirectories", getDirectories);
router.post("/createDirectory", createDirectory);
router.put("/:directoryId/updateDirectory", isDirectoryExists, updateDirectory);
router.delete(
  "/:directoryId/deleteDirectory",
  isDirectoryExists,
  deleteDirectory
);

module.exports = router;
