const mongoose = require("mongoose");

const roomDetails = new mongoose.Schema({
  dateOfCreation: { type: Date, default: Date.now() },
  roomName: { type: String, required: true, text: true },
  cryptedName: { type: String, required: true },
  description: { type: String, required: true },
  roomImage: { type: String, default: "photo" },
  shownOnSearch: { type: Boolean, default: true },
  privateRoom: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "userDetails" },
  subAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: "userDetails" }],
  waitingList: [{ type: mongoose.Schema.Types.ObjectId, ref: "userDetails" }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "userDetails" }],
});

module.exports = mongoose.model("roomDetails", roomDetails);
