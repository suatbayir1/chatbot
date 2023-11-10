// Libraries
const express = require("express");
const router = express.Router();

// Controllers
const {
  getConversations,
  createConversation,
} = require("../controllers/conversation");

// Routes
router.get("/getConversations", getConversations);
router.post("/createConversation", createConversation);

module.exports = router;
