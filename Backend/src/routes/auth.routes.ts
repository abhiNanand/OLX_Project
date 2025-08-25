import express from "express";
import User from "../models/user.model";
import { hashPassword, existingUser, verifyUserAndGenerateToken } from "../controllers/user.controller";

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
router.post("/login", async(req, res) => {
  const {email, password} = req.body;
  try{
    const user = await verifyUserAndGenerateToken(email,password);
    res.status(200).json({
      access: user.accessToken,
      refresh: user.refreshToken,
      id: user.id,
      username: user.username,
    });
  }
  catch(error: any){
    res.status(400).json({message: error.message || "Something went wrong"});
  }
});

//logout
router.post("/logout", (req,res) => {
  res.status(200).json({message: "Logged out successfully"});
});
export default router;
