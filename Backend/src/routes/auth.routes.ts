import express from "express";
import User from "../models/user.model";
import { hashPassword, existingUser } from "../controllers/user.controller";

const router = express.Router();

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

export default router;
