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
  const payload = { id: user._id};

  const accessToken =  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '1h'});
  
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: '7d'});

  //for now refresh token null

  
  return {
    accessToken,
    refreshToken,
    id: user._id,
    username: user.username,
  }

}