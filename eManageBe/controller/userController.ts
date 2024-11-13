import userModel from "../model/userModel";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, userName } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
      password: hashed,
      userName,
    });

    return res.status(201).json({
      message: "user created successfully",
      data: user,
      status: 201,
    });
  } catch (error) {
    return res.status(404).json({ message: "Error creating user" });
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;

    const user = await userModel.findOne({
      userName,
    });
    if (user) {
      const pass = await bcrypt.compare(password, user?.password);
      if (pass) {
        return res.status(201).json({
          message: "Welcome back",
          data: user,
        });
      } else {
        return res.status(404).json({
          message: "password is not correct",
        });
      }
    } else {
      return res.status(404).json({
        message: "username not found",
      });
    }
  } catch (error) {
    return res.status(404).json({ message: "Error logging" });
  }
};

export const readSingleAccount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;
    const users = await userModel.findById(userID);

    return res.status(200).json({
      message: "get single user",
      data: users,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "Error creating account",
      data: error,
    });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await userModel.find();

    return res.status(201).json({
      message: "get all users",
      data: users,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "Error creating account",
      data: error,
    });
  }
};
