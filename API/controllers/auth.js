import User from "../models/User.js";
import encryotor from "bcryptjs";
import { createError, imageRemover } from "../global/helper.js";
import { generateToken } from "../global/authHelper.js";

export const registerUser = async (req, res, next) => {
  const userImage = req.file;
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(createError(400, "Invalid Values !!"));
  }
  const userData = {
    name: name,
    email: email,
    password: password,
    userPic: userImage != undefined ? userImage.path : undefined,
  };
  try {
    const targetUser = await User.findOne({ email: userData.email });
    if (targetUser) {
      imageRemover(userImage.path);
      return next(createError(400, "User Already Exist Please Login!!."));
    }
    const encryptedPassword = await encryotor.hash(userData.password, 10);
    if (!encryptedPassword) {
      imageRemover(userImage.path);
      return next(createError(400, "Failed To Add User!."));
    }
    userData.password = encryptedPassword;
    const newUser = new User(userData);
    const newUserResponse = await newUser.save();
    res.status(201).json({
      message: "new User Created Successfully.",
      token: generateToken({
        _id: newUserResponse._id,
        name: name,
        email: email,
        userImage: newUserResponse.userPic,
      }),
    });
  } catch (err) {
    next(err);
  }
};

export const loginHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return next(createError(400, "User Doesn't Exsit Please Sign Up"));
    }
    const correctPass = await encryotor.compare(password, userExist.password);
    if (!correctPass) {
      return next(
        createError(400, "Wrong Password Please Enter Valid Values .")
      );
    }
    res.status(200).json({
      message: "Logged In Successfully !",
      _id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      userImage: userExist.userPic,
      token: generateToken({
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        userImage: userExist.userPic,
      }),
    });
  } catch (err) {
    next(err);
  }
};
