const express = require("express");
const isLogged = require("../middleware/isLogged");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { randomBytes } = require("crypto");
const Users = require("../models/Users");

cloudinary.config({
  cloud_name: "aktech27",
  api_key: "178671655958243",
  api_secret: "UyZ3MErQE80gbORAxouFDWaFb4E",
});

const router = express.Router();
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    randomBytes(12, (err, buf) => {
      if (err) return console.log(err);
      cb(null, buf.toString("hex") + "." + file.originalname.split(".").slice(-1));
    });
  },
});

router.put("/updatedetails", isLogged, (req, res) => {
  Users.findByIdAndUpdate(
    req.user._id,
    {
      firstName: req.body.fname,
      lastName: req.body.lname,
      phone: req.body.phone,
    },
    { new: true }
  )
    .then((updated) => {
      let { firstName, lastName, phone } = updated;
      req.user.firstName = firstName;
      req.user.lastName = lastName;
      req.user.phone = phone;
      res.send({
        message: "Profile updated Successfully",
        user: { firstName, lastName, phone, photo: req.body.photo },
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post(
  "/updateprofile",
  isLogged,
  multer({ storage: storage }).single("profilepic"),
  (req, res) => {
    cloudinary.uploader
      .upload(req.file.path, { public_id: "cloudemy/profilepics/" + req.user._id })
      .then((response) => {
        Users.findByIdAndUpdate(
          req.user._id,
          {
            firstName: req.body.fname,
            lastName: req.body.lname,
            phone: req.body.phone,
            photo: response.secure_url,
          },
          { new: true }
        )
          .then((updated) => {
            let { photo, firstName, lastName, phone } = updated;
            req.user.photo = photo;
            req.user.phone = phone;
            req.user.firstName = firstName;
            req.user.lastName = lastName;
            res.send({
              message: "Profile updated Successfully",
              user: { photo, firstName, lastName, phone },
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(401).send({ error: "Profile Update Failed" });
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(401).send({ error: "Profile Update Failed" });
      });
  }
);

module.exports = router;
