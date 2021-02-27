const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PORT = 5050 || process.env.PORT;
const { MONGOURI } = require("./configuration/secrets");
mongoose
  .connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB ");
  })
  .catch((err) => {
    console.log("Unable to connect to MongoDB : " + err);
  });

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(require("./routes/authorization"));
server.use(require("./routes/registration"));
server.use(require("./routes/create"));
server.use(require("./routes/views"));
server.use(require("./routes/edit"));

server.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
