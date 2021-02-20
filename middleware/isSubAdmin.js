const jwt = require("jsonwebtoken");
var userList = require("../models/Users");

const { JWTSEC } = require("../configuration/secrets");
const isSubAdmin = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in" });
  }
  let token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWTSEC, (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "Please login to access" });
    }
    let { _id } = payload;
    userList
      .findById(_id)
      .select("_id firstName lastName accountType")
      .then((validUser) => {
        if (validUser.accountType !== "SubAdmin") {
          return res.status(401).send({ error: "Only Sub-Admins are allowed" });
        }
        req.user = validUser;
        next();
      });
  });
};

module.exports = isSubAdmin;
