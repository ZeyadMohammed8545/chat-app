import { createError } from "../global/helper.js";
import User from "../models/User.js";
import Chat from "../models/chat.js";

export const accessChat = async (req, res, next) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      return next(createError(400, "UserId isn't Provided"));
    }

    //search If the Chat Already Exist
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email userPic",
    });

    //check if the chat Exist then we respond wit it else we would create it
    if (isChat.length > 0) {
      res
        .status(200)
        .json({ message: "fetched Chat Successfully", targetChat: isChat[0] });
    } else {
      //create The Chat
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const newChat = await new Chat(chatData).save();
      if (!newChat) {
        return next(createError(400, "Failed !!"));
      }
      const targetChat = await Chat.find({ _id: newChat._id }).populate(
        "users",
        "-password"
      );
      if (!targetChat) {
        return next(createError(400, "Failed !!"));
      }
      res
        .status(200)
        .json({ message: "Fetched Successfully", targetChat: targetChat });
    }
  } catch (err) {
    next(err);
  }
};
export const fetchChats = async (req, res, next) => {
  const userId = req.user._id;
  try {
    let targetChats = await Chat.find({ users: { $in: [userId] } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage");

    targetChats = await User.populate(targetChats, {
      path: "latestMessage.sender",
      select: "name email userPic",
    });
    res
      .status(200)
      .json({ message: "Fetched Chats Successfully", chats: targetChats });
  } catch (err) {
    next(err);
  }
};
export const createGroup = async (req, res, next) => {
  let { users, groupName } = req.body;
  try {
    if (!users || !groupName) {
      return next(createError(400, "Invalid Data"));
    }
    let groupUsers = JSON.parse(users);
    if (users.length < 2) {
      return next(
        createError(400, "Group Should Have At Least Two Members !.")
      );
    }
    groupUsers.push(req.user);

    const targetGroup = await Chat.findOne({
      chatName: groupName,
      users: { $in: groupUsers },
    });

    if (targetGroup) {
      return next(createError(400, "Group Already Exist"));
    }

    const groupChat = await Chat.create({
      chatName: groupName,
      users: groupUsers,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res
      .status(200)
      .json({ message: "Fetched Successfully", groupChat: fullGroupChat });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const renameGroup = async (req, res, next) => {
  try {
    const { newName, groupId } = req.body;
    const groupResponse = await Chat.findOneAndUpdate(
      { _id: groupId },
      { chatName: newName },
      { new: true }
    );
  } catch (err) {
    next(err);
  }
};

export const RemoveFromGroup = async (req, res, next) => {};
export const addToGroup = async (req, res, next) => {};
