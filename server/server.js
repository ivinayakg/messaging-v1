require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const connect = require("./db");
const { upgradeToSocket } = require("./socket");

let allowlist = ["https://messagingv1.netlify.app/"];
let corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
//middleware
app.use(cors(corsOptionsDelegate));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api", require("./routes"));
app.get("/test", (req, res) => {
  return res.send("its working");
});
// app.use("/", express.static("./public"));

const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  console.log(`Your app is running at port ${port}`)
);

server.on("upgrade", upgradeToSocket);

const start = async () => {
  try {
    await connect(process.env.MONGO_);
    console.log("\n\nServer is successfully connected\n");
  } catch (error) {
    console.log(error);
    server.close();
  }
};

start();

module.exports = { server: app };
