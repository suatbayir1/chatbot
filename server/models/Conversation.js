// Libraries
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
