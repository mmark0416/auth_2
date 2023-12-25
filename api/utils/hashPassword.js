import bcryptjs from "bcryptjs"

export const hashPassword = async (password) => {
  const hashedPassword = await bcryptjs.hash(password, 10)

  return hashedPassword
}