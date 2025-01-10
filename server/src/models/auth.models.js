import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      required: true,
      type: String,
      select: false, // means we cannot get password without specifying in node
    },
    task: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    profilePic:{
      type:String,
    }
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", schema);
