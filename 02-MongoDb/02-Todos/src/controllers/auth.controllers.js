import userModel from "../models/users.models.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/jwt.js";

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) return res.status(400).json({
            success: false,
            message: "Please enter all details"
        });

        const existingUser = await userModel.findOne({ email });

        if (existingUser) return res.status(400).json({
            success: false,
            message: "User Already Exist With This Email"
        });

        const newUser = await userModel.create({ fullname, email, password });

        if (!newUser) return res.status(400).json({
            success: false,
            message: "Failed To Create An User"
        });

        res.status(201).json({
            success: true,
            message: "Registration Successfull",
            user: newUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    };
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({
            success: false,
            message: "Invalid Email Or Password"
        });

        const existingUser = await userModel.findOne({ email });

        if (!existingUser) return res.status(400).json({
            success: false,
            message: "Invalid Email Or Password"
        });

        const comparedPassword = await bcrypt.compare(password, existingUser.password);

        if (!comparedPassword) return res.status(400).json({
            success: false,
            message: "Invalid Email Or Password"
        });

        const token = generateAccessToken(existingUser);

        if (!token) return res.status(400).json({
            success: false,
            message: "An Error Occured"
        });

        res.status(200).cookie("access_token", token, {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: process.env.NODE_ENV === "production",
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        }).json({
            success: true,
            message: "Login Successful",
            user: existingUser,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.cookie("access_token", "", {
            expires: new Date(0),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = req.user;

        if (!user) return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });

        const id = user.id;

        const existingUser = await userModel.findById(id);

        if (!existingUser) return res.status(404).json({
            success: false,
            message: "User Not Found"
        });

        res.status(200).json({
            success: true,
            message: "User Data Fetched Successfully",
            user: existingUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};