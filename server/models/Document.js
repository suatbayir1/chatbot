// Libraries
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentSchema = new Schema(
  {
    directory: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Please provide a directory id"],
      ref: "Directory",
    },
    savedName: {
      type: String,
      required: [true, "Please provide a saved name"],
    },
    originalName: {
      type: String,
      required: [true, "Please provide a original name"],
    },
    status: {
      type: String,
      required: [true, "Please provide a status"],
      enum: ["UPLOADED", "LEARNED", "TRANSFORMING"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: null,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Document", DocumentSchema);
