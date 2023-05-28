import express from "express";
const Router = express.Router();
import { getAllUsers } from "../controllers/user.js";
import { protect } from "../global/authHelper.js";

Router.get("/", protect, getAllUsers); 

export default Router;
