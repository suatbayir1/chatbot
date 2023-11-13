// Libraries
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DirectorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a directory name"],
    },
    documents: [
      {
        type: mongoose.Schema.ObjectId,
        default: [],
        ref: "Document",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Directory", DirectorySchema);
