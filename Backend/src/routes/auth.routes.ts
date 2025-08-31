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
import authMiddleware from "../middleware/authMiddleware";

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

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as CustomJwtPayload;

    const userId = decoded.id;

    const accessToken = jwt.sign(
      { id: userId },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token ", error });
  }
});

//send userInfo
router.get("/userinfo", authMiddleware, async (req, res) => {
  try {
    const _id = req.user?.id;

    const user = await User.findById(_id);
    if (!user)
      return res.status(401).json({ message: "User not found" });
    return res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

//edit userInfo
router.post("/updateuserdetails", authMiddleware, async (req, res) => {
  
  try {
    const { username, email, phoneNumber, aboutMe } = req.body;
    const id = req.user?.id;
    const user =await User.findById(id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.username = username ?? user.username;
    user.email = email ?? user.email;
    user.aboutMe = aboutMe ?? user.aboutMe
    user.phoneNumber = phoneNumber ?? user.phoneNumber;

    await user.save();

  res.status(200).json({ message: "User details updated", user });
}
        catch (error) {
  res.status(500).json("server error");
}
});

export default router;
