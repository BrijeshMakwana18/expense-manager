const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// Imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routesV1 = require("./routes/index");
const cors = require("cors");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("./modal/User");
const hasher = require("./utils/Hasher");
const EMAIL =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const app = express();

dotenv.config();

// MongoDB Connect
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to DB");
});
// const db = mongoose.connection;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/v1", routesV1);

app.get("/", (req, res) => res.status(200).send("Hello"));

exports.app = functions.https.onRequest(app);
