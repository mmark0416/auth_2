import { UnauthorizedError } from "../errors/customError.js";
import { verifyJwtToken } from "./jwt.js";

export const verifyUser = async (req, res, next) => {
  const token = req.cookies.access_token;
  
  if (!token) throw new UnauthorizedError("You need to login");

  const user = await verifyJwtToken(token);

  req.user = user;
  next();
};
