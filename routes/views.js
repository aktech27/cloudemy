const express = require("express");
const isLogged = require("../middleware/isLogged");
const Rooms = require("../models/Rooms");
const Shelfs = require("../models/Shelf");

const router = express.Router();

router.get("/viewrooms", isLogged, (req, res) => {
  Rooms.find({ members: Object(req.user._id) })
    .populate("createdBy", "_id firstName lastName")
    .then((rooms) => res.status(200).send({ rooms }))
    .catch((err) => console.log(err));
});

router.post("/viewshelfs", isLogged, (req, res) => {
  console.log(req.body.roomCode);
  Shelfs.find({ belongsTo: req.body.roomCode })
    .populate("createdBy", "_id firstName lastName")
    .then((shelfs) => res.status(200).send({ shelfs }))
    .catch((err) => console.log(err));
});

router.post("/searchroom", isLogged, (req, res) => {
  Rooms.find({
    $or: [
      { roomName: { $regex: req.body.roomName, $options: "i" }, showOnSearch: true },
      { cryptedName: { $regex: req.body.roomName, $options: "i" }, showOnSearch: true },
    ],
  })
    .populate("createdBy", "_id firstName lastName")
    .then((rooms) => res.status(200).send({ rooms }))
    .catch((err) => console.log(err));
});

router.put("/joinroom", isLogged, (req, res) => {
  Rooms.findOne({ members: Object(req.user._id) }).then((alreadyJoined) => {
    if (alreadyJoined) return res.status(422).send({ error: "Already Joined" });

    Rooms.findByIdAndUpdate(req.body.roomID, { $push: { members: req.user._id } }, { new: true })
      .then(() => res.status(200).send({ message: "Joined Successfully" }))
      .catch((err) => res.status(500).send({ error: err }));
  });
});

module.exports = router;
