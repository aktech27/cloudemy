const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Users = require("../models/Users");
const Gmailer = require("../configuration/gmailer");

router.put("/verify", (req, res) => {
  Users.updateOne(
    { accountToken: req.body.accountToken },
    { accountToken: undefined, isVerified: true }
  )
    .then((updated) => {
      console.log(updated);
      if (updated.nModified) {
        return res.status(200).send({ message: "Account verified successfully" });
      } else {
        return res
          .status(401)
          .send({ error: "Unable to verify. Token already verified or invalid" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/register", (req, res) => {
  let { firstName, lastName, email, password, phone } = req.body;
  if (!firstName || !lastName || !email || !password || !phone) {
    return res.status("422").send({ error: "Mandatory fields are missing" });
  }
  Users.findOne({ email }).then((existingUser) => {
    if (existingUser) {
      return res.status("422").send({ error: "This user is already registered with us" });
    }
    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            console.log("Crypto Error : " + err);
            return res.status(500).send({ error: "An error occured. Please retry" });
          }
          let accountToken = buf.toString("hex");
          console.log(accountToken);
          let mail = {
            from: "no-reply@gmail.com",
            to: email,
            subject: "Account Verification",
            html: `<h1>Please verify your account here:</h1><br>
            <h3><a href="https://localhost:3000/verify" target="_blank">Click here</a> to verify your account.${accountToken}</h3>`,
          };
          Gmailer.sendMail(mail, (error, info) => {
            if (error) {
              console.log(error);
              return res.status(422).send({ error: "Failed to send email" });
            }
            console.log("Mail sent successfully : " + info);
            let newUser = new Users({
              firstName,
              lastName,
              email,
              password: hashedPassword,
              phone,
              accountToken,
            });
            newUser
              .save()
              .then((created) => {
                console.log("New User created successfully\n" + created);
                return res
                  .status(200)
                  .send({ message: "Your account has been registered successfully" });
              })
              .catch((err) => {
                console.log("Account creation error : " + err);
                res.status(500).send({ error: "Unable to create your account" });
              });
          });
        });
      })
      .catch((err) => {
        console.log("Error in hashing" + err);
      });
  });
});

module.exports = router;
