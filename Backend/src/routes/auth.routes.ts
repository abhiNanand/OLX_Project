import express from "express";
import User from "../models/user.model";

import jwt from "jsonwebtoken";
import { CustomJwtPayload } from "../middleware/types/jwt";

declare module "express-serve-static-core" {
  interface Request {
    user?: CustomJwtPayload;
  }
}

import {
  hashPassword,
  existingUser,
  verifyUserAndGenerateToken,
} from "../controllers/user.controller";

const router = express.Router();

//signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //check if user already exists
    const userExists = await existingUser(email);
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    //Hash password
    const hashedPassword = await hashPassword(password);
    //Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await verifyUserAndGenerateToken(email, password);
    res.cookie("refreshToken", user.refreshToken, {
      httpOnly: true,
    });
    res.status(200).json({
      access: user.accessToken,
      id: user.id,
      username: user.username,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Something went wrong" });
  }
});

//logout
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("refreshToken", { httpOnly: true });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});

//send token if experired
router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "No token provided" });

  try{
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as CustomJwtPayload;

    const userId = decoded.id;
    
    const accessToken = jwt.sign({id: userId}, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '1h'});

    return res.status(200).json({accessToken}); 
  }
  catch(error){
    return res.status(403).json({ message: "Invalid refresh token ",error });
  }
});

export default router;
