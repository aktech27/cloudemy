const express = require("express");
const multer = require("multer");
const isLogged = require("../middleware/isLogged");
const isAdmin = require("../middleware/isAdmin");
const isSubAdmin = require("../middleware/isSubAdmin");
const crypto = require("crypto");
const Rooms = require("../models/Rooms");
const Shelf = require("../models/Shelf");

const router = express.Router();

router.post("/createroom", isLogged, isAdmin, (req, res) => {
  Rooms.findOne({ roomName: req.body.roomName, createdBy: { _id: req.user._id } })
    .then((existingRoom) => {
      console.log(existingRoom);
      if (existingRoom) {
        return res.status(422).send({
          error:
            "Failed to create room. A room, created by you is already available with this name",
        });
      }
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
          console.log(req.user);
          let { roomName, description } = req.body;
          let newRoom = new Rooms({
            roomName,
            cryptedName,
            description,
            createdBy: req.user,
            members: [req.user],
          });
          newRoom
            .save()
            .then((success) => {
              console.log(success);
              res.status(200).send({ message: "Room Created Successfully" });
            })
            .catch((err) => console.log(err));
        });
      });
    })
    .catch((err) => console.log(err));
});

router.post("/createshelf", isLogged, isSubAdmin, (req, res) => {
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
  const fs = require("fs");
  const path = require("path");
  crypto.randomBytes(12, (err, buf) => {
    if (err) {
      console.log("Error in Crypting shelf");
      return res.status(500).send({ error: "Failed to create shelf. Please try again" });
    }
    const cryptedName = buf.toString("hex");
    fs.mkdir(path.join(process.cwd(), "Rooms", req.body.roomCryptedName, cryptedName), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ error: "Failed to create shelf. Please try again" });
      }
      let { shelfName, description, belongsTo } = req.body;
      let newShelf = new Shelf({
        shelfName,
        cryptedName,
        description,
        belongsTo,
        createdBy: req.user,
      });
      newShelf
        .save()
        .then((success) => {
          console.log(success);
          return res.status(200).send({ message: "Shelf created successfully" });
        })
        .catch((err) => console.log(err));
    });
  });
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
