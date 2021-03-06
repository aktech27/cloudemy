const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const isLogged = require("../middleware/isLogged");
const isAdmin = require("../middleware/isAdmin");
const isSubAdmin = require("../middleware/isSubAdmin");
const crypto = require("crypto");
const Rooms = require("../models/Rooms");
const Shelf = require("../models/Shelf");

const router = express.Router();
cloudinary.config({
  cloud_name: "aktech27",
  api_key: "178671655958243",
  api_secret: "UyZ3MErQE80gbORAxouFDWaFb4E",
});
const cloudinaryStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    crypto.randomBytes(12, (err, buf) => {
      if (err) return console.log(err);
      cb(null, buf.toString("hex") + "." + file.originalname.split(".").slice(-1));
    });
  },
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./");
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(10, (err, buf) => {
      if (err) return console.log(err);
      cb(null, buf.toString("hex") + "." + file.originalname.split(".").slice(-1));
    });
  },
});

router.post(
  "/createroom",
  isLogged,
  isAdmin,
  multer({ storage: cloudinaryStorage }).single("roomImage"),
  (req, res) => {
    if (!req.file) {
      req.file = {};
      req.file.path =
        "https://res.cloudinary.com/aktech27/image/upload/v1614421879/cloudemy/roompics/defaultpic.png";
    }
    Rooms.findOne({ roomName: req.body.roomName, createdBy: { _id: req.user._id } })
      .then((existingRoom) => {
        if (existingRoom) {
          return res.status(422).send({
            error:
              "Failed to create room. A room, created by you is already available with this name",
          });
        }
        console.log(req.file);
        const fs = require("fs");
        const path = require("path");
        crypto.randomBytes(12, (err, buf) => {
          if (err) {
            console.log("Error in Crypting room");
            return res.status(500).send({ error: "Failed to create room. Please try again" });
          }
          const cryptedName = buf.toString("hex");
          fs.mkdir(path.join(process.cwd(), "Rooms", cryptedName), (err) => {
            if (err) {
              console.error(err);
              return res.status(500).send({ error: "Failed to create room. Please try again" });
            }
            cloudinary.uploader
              .upload(req.file.path, { public_id: "cloudemy/roompics/" + cryptedName })
              .then((response) => {
                let { roomName, description, showOnSearch, privateRoom } = req.body;
                let newRoom = new Rooms({
                  roomName,
                  cryptedName,
                  description,
                  roomImage: response.secure_url,
                  createdBy: req.user,
                  showOnSearch,
                  privateRoom,
                  members: [req.user],
                });
                newRoom
                  .save()
                  .then((success) => {
                    console.log(success);
                    res.status(200).send({ message: "Room Created Successfully" });
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          });
        });
      })
      .catch((err) => console.log(err));
  }
);

router.post(
  "/createshelf",
  isLogged,
  isSubAdmin,
  multer({ storage: cloudinaryStorage }).single("shelfImage"),
  (req, res) => {
    Shelf.findOne({ shelfName: req.body.shelfName, createdBy: { _id: req.user._id } })
      .then((existingShelf) => {
        console.log(existingShelf);
        if (existingShelf) {
          return res.status(422).send({
            error:
              "Failed to create shelf. A shelf, created by you is already available with this name",
          });
        }
      })
      .catch((err) => console.log(err));
    if (!req.file) {
      req.file = {};
      req.file.path =
        "https://res.cloudinary.com/aktech27/image/upload/v1614421879/cloudemy/shelfpics/defaultpic.png";
    }
    const fs = require("fs");
    const path = require("path");
    crypto.randomBytes(12, (err, buf) => {
      if (err) {
        console.log("Error in Crypting shelf");
        return res.status(500).send({ error: "Failed to create shelf. Please try again" });
      }
      const cryptedName = buf.toString("hex");
      fs.mkdir(path.join(process.cwd(), "Rooms", req.body.belongsTo, cryptedName), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send({ error: "Failed to create shelf. Please try again" });
        }
        cloudinary.uploader
          .upload(req.file.path, {
            public_id: "cloudemy/shelfpics/" + cryptedName,
          })
          .then((response) => {
            let { shelfName, description, belongsTo, Protected } = req.body;
            let newShelf = new Shelf({
              shelfName,
              cryptedName,
              description,
              belongsTo,
              shelfImage: response.secure_url,
              protected: Protected,
              createdBy: req.user,
            });
            newShelf
              .save()
              .then((success) => {
                console.log(success);
                return res.status(200).send({ message: "Shelf created successfully" });
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      });
    });
  }
);

router.post(
  "/createpost",
  isLogged,
  isSubAdmin,
  multer({ storage: storage }).array("fileInput"),
  (req, res) => {
    console.log(req.files);
    console.log(req.body.roomName);
    res.status(200).send({ message: "Upload Successful" });
  }
);

module.exports = router;
