// Libraries
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DirectorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a directory name"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    documents: [
      {
        type: mongoose.Schema.ObjectId,
        default: [],
        ref: "Document",
      },
    ],
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Directory", DirectorySchema);
