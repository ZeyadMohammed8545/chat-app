import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;

const Message = new Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    targetChat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);
export default mongoose.model("Message", Message);
