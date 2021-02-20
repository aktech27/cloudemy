const mongoose = require("mongoose");

const postDetails = new mongoose.Schema({
  dateOfCreation: { type: Date, default: Date.now() },
  title: { type: String, required: true },
  description: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: String, required: true },
  filePath: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "userDetails" },
});

module.exports = mongoose.model("userDetails", userDetails);
