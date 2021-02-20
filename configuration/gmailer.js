const nodemailer = require("nodemailer");
const { EMUSR, EMPSD } = require("./secrets");

const Gmailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMUSR,
    pass: EMPSD,
  },
});

module.exports = Gmailer;
