import bcrypt from 'bcrypt';
import User from "../models/user.model";
import jwt from 'jsonwebtoken';

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

// generate JWT token
export const generateToken = (userId: string): string =>{
 return jwt.sign({id:userId}, process.env.JWT_SECRET as string, {expiresIn: '1h'});
}

// verify password and generate token
export const verifyUserAndGenerateToken = async (email: string, password: string) =>{
  const user = await User.findOne({email});
  if(!user){
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch){
    throw new Error("Invalid credentials");
  }

  // generate token 
  const token = generateToken(user._id.toString());

  //for now refresh token null
  const refreshToken = null;

  return {
    accessToken: token,
    refreshToken,
    id: user._id,
    username: user.username,
  }

}