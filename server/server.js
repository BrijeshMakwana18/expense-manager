//Import Express
const express = require("express");
const app = express();
//Import dotenv
const dotenv = require("dotenv");
dotenv.config();
//Import Mongoose
const mongoose = require("mongoose");
//Import Routes
const authRoute = require("./routes/auth");

//MongoDB Connect
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to DB");
});

//Middlewares
app.use(express.json());
app.use("/api/user", authRoute);

app.listen(3000, () => {
  console.log("Server is running");
});
