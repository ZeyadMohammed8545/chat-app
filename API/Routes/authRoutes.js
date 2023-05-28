import express from "express";
import { userImageUpload } from "../global/multerMiddle.js";
const Router = express.Router();

import { registerUser, loginHandler } from "../controllers/auth.js";


Router.post("/new-user", userImageUpload.single("userImage"), registerUser);
Router.post("/login", loginHandler);

export default Router;
