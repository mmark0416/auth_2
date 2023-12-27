import jwt from "jsonwebtoken";

export const createJwtToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET);

  return token;
};

export const verifyJwtToken = async (token) => {
  const payload = await jwt.verify(token, process.env.JWT_SECRET);

  return payload;
};
