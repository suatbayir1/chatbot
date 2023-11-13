// Libraries
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
