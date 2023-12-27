import { BadRequestError, NotFoundError } from "../errors/customError.js";
import User from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utils/bcryptjs.js";
import { createJwtToken } from "../utils/jwt.js";

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

  const token = await createJwtToken({ id: validUser._id });
  console.log(token);

  const { password: hashedPassword, ...rest } = validUser._doc;

  const expiryDate = new Date(Date.now() + 100 * 60 * 60);
  res
    .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
    .status(StatusCodes.OK)
    .json(rest);
};

export const google = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const expiryDate = new Date(Date.now() + 100 * 60 * 60);

  if (user) {
    const token = await createJwtToken({ id: user._id });
    const { password: hashedPassword, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(StatusCodes.OK)
      .json(rest);
  } else {
    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await hashPassword(generatedPassword);

    const newUser = new User({
      username:
        req.body.name.split(" ").join("").toLowerCase() +
        Math.floor(Math.random() * 10000).toString(),
      email: req.body.email,
      password: hashedPassword,
      profilePicture: req.body.photo,
    });

    await newUser.save();
    const token = await createJwtToken({ id: newUser._id });
    const { password: hashedPassword2, ...rest } = newUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(StatusCodes.OK)
      .json(rest);
  }
};
