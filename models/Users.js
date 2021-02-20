const mongoose = require("mongoose");

const userDetails = new mongoose.Schema({
  dateofCreation: { type: Date, default: Date.now() },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: {
    type: String,
    default:
      "https://res.cloudinary.com/aktech27/image/upload/v1613753834/cloudemy/profilepics/defaultpic.png",
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  accountType: { type: String, default: "User" },
  accountToken: { type: String },
  resetToken: { type: String },
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("userDetails", userDetails);
