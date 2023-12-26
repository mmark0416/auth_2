import { BadRequestError, NotFoundError } from "../errors/customError.js";
import User from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utils/bcryptjs.js";
import { createToken } from "../utils/jwt.js";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  res.status(StatusCodes.CREATED).json(newUser);
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const validUser = await User.findOne({ email });
  if (!validUser) throw new NotFoundError("Invalid credentials");

  const validPassword = await comparePassword(password, validUser.password);
  if (!validPassword) throw new NotFoundError("Invalid credentials");

  const token = createToken({ id: validUser._id });

  const { password: hashedPassword, ...rest } = validUser._doc;

  const expiríDate = new Date(Date.now() + 100 * 60 * 60);
  res
    .cookie("access_token", token, { httpOnly: true, expires: expiríDate })
    .status(StatusCodes.OK)
    .json(rest);
};
