const mongoose = require("mongoose");

const shelfDetails = new mongoose.Schema({
  dateOfCreation: { type: Date, default: Date.now() },
  shelfName: { type: String, required: true },
  cryptedName: { type: String, required: true },
  shelfImage: { type: String, default: "photo" },
  description: { type: String, required: true },
  protected: { type: Boolean, default: false },
  belongsTo: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "userDetails" },
});

module.exports = mongoose.model("shelfDetails", shelfDetails);
