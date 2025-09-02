"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_controller_1 = require("../controllers/user.controller");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
//signup
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //check if user already exists
        const userExists = await (0, user_controller_1.existingUser)(email);
        if (userExists) {
            return res
                .status(400)
                .json({ message: "User with this email already exists" });
        }
        //Hash password
        const hashedPassword = await (0, user_controller_1.hashPassword)(password);
        //Create user
        const newUser = new user_model_1.default({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }
});
//login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await (0, user_controller_1.verifyUserAndGenerateToken)(email, password);
        res.cookie("refreshToken", user.refreshToken, {
            httpOnly: true,
        });
        res.status(200).json({
            access: user.accessToken,
            id: user.id,
            username: user.username,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message || "Something went wrong" });
    }
});
//logout
router.post("/logout", (req, res) => {
    try {
        res.clearCookie("refreshToken", { httpOnly: true });
        return res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
});
//send token if experired
router.post("/refresh", async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.status(401).json({ message: "No token provided" });
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userId = decoded.id;
        const accessToken = jsonwebtoken_1.default.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ accessToken });
    }
    catch (error) {
        return res.status(403).json({ message: "Invalid refresh token ", error });
    }
});
//send userInfo
router.get("/userinfo", authMiddleware_1.default, async (req, res) => {
    try {
        const _id = req.user?.id;
        const user = await user_model_1.default.findById(_id);
        if (!user)
            return res.status(401).json({ message: "User not found" });
        return res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
//edit userInfo
router.post("/updateuserdetails", authMiddleware_1.default, async (req, res) => {
    try {
        const { username, email, phoneNumber, aboutMe } = req.body;
        const id = req.user?.id;
        const user = await user_model_1.default.findById(id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        user.username = username ?? user.username;
        user.email = email ?? user.email;
        user.aboutMe = aboutMe ?? user.aboutMe;
        user.phoneNumber = phoneNumber ?? user.phoneNumber;
        await user.save();
        res.status(200).json({ message: "User details updated", user });
    }
    catch (error) {
        res.status(500).json("server error");
    }
});
exports.default = router;
