require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const connect = require("./db");

//middleware
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api", require("./routes"));

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connect(process.env.MONGO_);
    console.log("\n\nServer is successfully connected\n");
    app.listen(port, () => console.log(`Your app is running at port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
