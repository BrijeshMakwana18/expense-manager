//Import Express
const express = require("express");
const app = express();
//Import dotenv
const dotenv = require("dotenv");
dotenv.config();
//Import Mongoose
const mongoose = require("mongoose");
//Import Routes
const routesV1 = require("./routes/v1");

//MongoDB Connect
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to DB");
});
const db = mongoose.connection;
//Middlewares
app.use(express.json());
app.use("/api/v1", routesV1);

app.listen(3000, () => {
  console.log("Server is running");
});

module.exports = db;
