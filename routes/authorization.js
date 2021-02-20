const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const Users = require("../models/Users");
const Gmailer = require("../configuration/gmailer");
const { JWTSEC } = require("../configuration/secrets");

router.post("/forgot", (req, res) => {});

router.put("/reset", (req, res) => {});

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status("422").send({ error: "Mandatory fields are missing" });
  }
  Users.findOne({ email }).then((existingUser) => {
    if (!existingUser) {
      return res.status("422").send({ error: "This email is not registered with us" });
    }
    bcrypt
      .compare(password, existingUser.password)
      .then((isTrue) => {
        if (isTrue) {
          if (!existingUser.isVerified) {
            return res
              .status(401)
              .send({ error: "Account is not verified yet. Please check your registered email" });
          }
          const jwtToken = jwt.sign({ _id: existingUser._id }, JWTSEC);
          let { _id, firstName, lastName, email } = existingUser;
          res.status(200).send({
            message: "User Logged in successfully",
            token: jwtToken,
            user: { _id, firstName, lastName, email },
          });
        } else {
          return res.status(422).send({ error: "Invalid Password" });
        }
      })
      .catch((err) => {
        console.log("Login error : " + err);
      });
  });
});

module.exports = router;
