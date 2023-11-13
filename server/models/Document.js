// Libraries
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/** Models */
const Directory = require("./Directory");

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
  },
  { versionKey: false, timestamps: true }
);

DocumentSchema.pre("save", async function (next) {
  if (this.isNew) {
    const directory = await Directory.findById(this.directory);
    directory.documents.push(this._id);
    await directory.save();

    next();
  } else {
    next();
  }
});

module.exports = mongoose.model("Document", DocumentSchema);
