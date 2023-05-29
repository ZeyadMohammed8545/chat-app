import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "./helper.js";

export const generateToken = (signedData) => {
  const token = jwt.sign(signedData, process.env.secret_keyword, {
    expiresIn: "1h",
  });

  return token;
};

export const protect = async (req, res, next) => {
  console.log("protect Route Reached");
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(createError(400, "UnAuthorized"));
    }
    const token = authHeader.split("=")[1];
    if (!token) {
      return next(createError(400, "UnAuthorized"));
    }

    jwt.verify(token, process.env.secret_keyword, async (err, user) => {
      if (err) {
        return next(err);
      }

      const loggedUser = await User.findById(user._id);
      if (!loggedUser) {
        return next(createError(400, "User Doesn't exist"));
      }
      delete loggedUser._doc.password;
      req.user = loggedUser;
      next();
    });
  } catch (err) {
    next(err);
  }
};
