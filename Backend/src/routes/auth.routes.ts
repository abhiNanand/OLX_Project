import express from "express";
//import bcrypt from 'bcryptjs';
import User from "../models/user.model";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //check if user already exists

    //Hash password

    //Create user
    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({message:"Server error", error:error});
  }
});

export default router;
