import { BadRequestError } from "../errors/customError.js";
import User from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../utils/hashPassword.js";


export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await hashPassword(password)

  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  res.status(StatusCodes.CREATED).json(newUser);
};
