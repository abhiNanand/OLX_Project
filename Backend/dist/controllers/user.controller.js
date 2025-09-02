"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserAndGenerateToken = exports.existingUser = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// hash password
const hashPassword = async (password) => {
    const salt = await bcrypt_1.default.genSalt(10);
    return await bcrypt_1.default.hash(password, salt);
};
exports.hashPassword = hashPassword;
// check if user already exists
const existingUser = async (email) => {
    const user = await user_model_1.default.findOne({ email });
    return user ? true : false;
};
exports.existingUser = existingUser;
// verify password and generate token
const verifyUserAndGenerateToken = async (email, password) => {
    const user = await user_model_1.default.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    // generate token 
    const payload = { id: user._id };
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    //for now refresh token null
    return {
        accessToken,
        refreshToken,
        id: user._id,
        username: user.username,
    };
};
exports.verifyUserAndGenerateToken = verifyUserAndGenerateToken;
