//import Dependencies
import express from "express";
import parser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

//import Local Functions And Objects
import socketObj from "./global/socket.js";
const { initialize, getIo } = socketObj;
//initialize App
dotenv.config();
const App = express();
App.use(parser.json());

App.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

//express Error MiddleWare
App.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error !!.";
  res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
  next();
});

//connect to DataBase
mongoose.connect(process.env.dbURL).then((connectResult) => {
  console.log("connected Successfully");
  const Server = App.listen(process.env.PORT);
  initialize(Server);
  getIo().on("connection", () => {
    console.log("client Connected To Sockets");
  });
});
