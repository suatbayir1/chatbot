/** Libraries */
const asyncErrorWrapper = require("express-async-handler");

/** Models */
const Conversation = require("../models/Conversation");

/** Functions */
const getConversations = asyncErrorWrapper(async (req, res, next) => {
  const conversations = await Conversation.find().sort({ updatedAt: "desc" });

  return res.status(200).json({
    data: conversations,
    message: "Fetched created conversations successfully",
  });
});

const createConversation = asyncErrorWrapper(async (req, res, next) => {
  console.log("request");
  const conversation = await Conversation.create(req.body);
  conversation.name = `Conversation #${conversation._id}`;
  conversation.save();

  return res.status(200).json({
    data: conversation,
    message: "Conversation created successfully",
  });
});

module.exports = {
  getConversations,
  createConversation,
};
