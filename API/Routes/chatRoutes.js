import express from "express";
import { accessChat, fetchChats, createGroup, renameGroup } from "../controllers/chat.js";
import { protect } from "../global/authHelper.js";

const Router = express.Router();

Router.get("/", protect, fetchChats);
Router.post("/", protect, accessChat);
Router.post("/create-group", protect, createGroup);
Router.put("/rename-group", renameGroup);
// Router.put("/remove-group", removeFromGroup);
// Router.put("/add-to-group", addToGroup);

export default Router;
