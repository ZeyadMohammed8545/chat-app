//import dependencies
import express from "express";
import dotevn from "dotenv";
import mongoose from "mongoose";
import parser from "body-parser";

//import variables And Methods From Local Files
import socketObj from "./global/socket.js";

dotevn.config();
const App = express();
App.use(parser.json());


//define main Routes


//Express error handler
App.use((err, req, res, next) => {
  const error = new Error();
  error.status = err.status || 500;
  error.message = err.message || "Internal Server Error";
  res.status(error.status).json({
    success: false,
    status: error.status,
    message: error.message,
  });
  next();
});

mongoose.connect(process.env.dbURL).then((connectObj) => {
  const server = App.listen(process.env.PORT);
  const { initialize, getSocket } = socketObj;
  initialize(server);
  getSocket().on("connection", (socketConnection) => {
    console.log("client connected To Socket");
  });
});
