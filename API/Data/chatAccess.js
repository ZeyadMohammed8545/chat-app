import { createError } from "../global/helper.js";
import Chat from "../models/chat.js";

export const groupRename = async (groupData) => {
  try {
    const groupResponse = await Chat.findOneAndUpdate(
      { _id: groupData.groupId, isGroupChat: true },
      { chatName: groupData.newName },
      { new: true }
    );
    return groupResponse;
  } catch (err) {
    throw new Error(err);
  }
};

export const chatCreate = async (chatData) => {
  try {
    const newChatResponse = await Chat.create(chatData);
    return newChatResponse;
  } catch (err) {
    throw new Error(err);
  }
};

export const removeGroupMember = async (groupData) => {
  try {
    const updatedChat = await Chat.findOneAndUpdate(
      { _id: groupData.groupId, isGroupChat: true },
      { $pull: { users: groupData.memberId } },
      { new: true }
    );
    return updatedChat;
  } catch (err) {
    throw new Error(err);
  }
};

export const addMember = async (groupData) => {
  try {
    const updatedChat = await Chat.findOneAndUpdate(
      {
        _id: groupData.chatId,
        isGroupChat: true,
      },
      { $push: { users: groupData.memberId } },
      { new: true }
    );
    return updatedChat;
  } catch (err) {
    throw new Error(err);
  }
};
