import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

const hashPassword = async (password: string) => {
  // password = ali1212 => Hash => dngsbipnrg9ipbn39ubnj9unertn
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

const generateToken = (data: object) => {
  const token = sign({ ...data }, process.env.JWT_SECRET, {
    // algorithm: ''
    expiresIn: "24h",
  });

  return token;
};

const verifyPassword = async (password: string, hashedPassword: string) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

const verifyToken = (token:string) => {
  try {
    const validationResult = verify(token, process.env.JWT_SECRET);
    return validationResult;
  } catch (err) {
    console.log("Verify Token Error =>", err);
    return false;
  }
};

export { hashPassword, generateToken, verifyPassword, verifyToken };



