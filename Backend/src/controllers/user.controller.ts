import bcrypt from 'bcrypt';
import User from "../models/user.model";

// hash password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// check if user already exists
export const existingUser = async (email: string):Promise<boolean> =>{
  const user = await User.findOne({email});
  return user ? true :false;
}