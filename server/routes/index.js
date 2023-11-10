// Libraries
const express = require("express");
const router = express.Router();

// Route modules
const knowledge = require("./knowledge");
const conversation = require("./conversation");
const document = require("./document");

// Routers
router.use("/knowledge", knowledge);
router.use("/conversation", conversation);
router.use("/document", document);

module.exports = router;
