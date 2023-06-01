import express from "express";
import {
  accessChat,
  fetchChats,
  createGroup,
  renameGroup,
  RemoveFromGroup,
  addToGroup,
} from "../controllers/chat.js";
import { protect } from "../global/authHelper.js";

const Router = express.Router();

Router.get("/", protect, fetchChats);
Router.post("/", protect, accessChat);
Router.post("/create-group", protect, createGroup);
Router.put("/rename-group", protect, renameGroup);
Router.put("/remove-group", protect, RemoveFromGroup);
Router.put("/add-to-group", protect, addToGroup);

export default Router;
