import { StatusCodes } from "http-status-codes";
import { ForbiddenError } from "../errors/customError.js";
import User from "../models/user.model.js";
import { hashPassword } from "../utils/bcryptjs.js";

export const test = (req, res) => {
  res.send("hello");
};

export const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id)
    throw new ForbiddenError("You can update only your account!");

  if (req.body.password) {
    req.body.password = hashPassword(req.body.password);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture,
      },
    },
    { new: true }
  );
  res.status(StatusCodes.OK).json(updatedUser)
};
