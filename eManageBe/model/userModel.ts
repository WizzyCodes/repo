import { Document, model, Schema } from "mongoose";

export interface iUser {
  userName: string;
  email: string;
  password: string;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
