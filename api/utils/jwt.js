import jwt from "jsonwebtoken";

export const createToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET);

  return token;
};
