var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const cors = require("cors");
const path = require("path");
const moment = require("moment-timezone");
const dotenv = require("dotenv");
dotenv.config();

const router = require("./routes/router");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
//express CORS
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); //image icons access from server

//express CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,access_token"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//express router
app.use("/clicknsplit/api", router);

//TEST  API
app.get("/", function (req, res) {
  res.status(200).send("Hello World!");
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("App is running on port: " + port);
});

//For unit testing
module.exports = app;
