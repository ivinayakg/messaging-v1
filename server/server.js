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

const whitelist = ["https://messagingv1.netlify.app"];
const corsOptionsDelegate = {
  origin: "https://messagingv1.netlify.app",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//middleware
app.use(helmet());
app.use(cors(corsOptionsDelegate));
app.use(xss());
app.use(mongoSanitize());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api", require("./routes"));
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
