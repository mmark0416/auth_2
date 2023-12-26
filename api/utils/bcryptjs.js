import bcryptjs from "bcryptjs";

export const hashPassword = async (password) => {
  const hashedPassword = await bcryptjs.hash(password, 10);

  return hashedPassword;
};

export const comparePassword = async (password, userPassword) => {
  const valid = await bcryptjs.compare(password, userPassword);

  return valid;
};
