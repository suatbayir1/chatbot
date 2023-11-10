// Libraries
const express = require("express");
const router = express.Router();

// Controllers
const { getDirectories, createDirectory } = require("../controllers/knowledge");

// Routes
router.get("/getDirectories", getDirectories);
router.post("/createDirectory", createDirectory);

module.exports = router;
