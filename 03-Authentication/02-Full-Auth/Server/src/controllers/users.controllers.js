import Users from "../models/users.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET, {
        expiresIn: "6h",
    });
};
const generateRefreshToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET, {
        expiresIn: "7d",
    });
};

const signUp = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName) return res.status(400).json({ message: "Full Name is Required" });
        if (!email) return res.status(400).json({ message: "Email is Required" });
        if (!password) return res.status(400).json({ message: "Password is Required" });

        const existingUser = await Users.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User Already Exists" });

        const newUser = await Users.create({ fullName, email, password });
        res.status(201).json({ message: "User Successfully Created", data: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred during registration" });
    };
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.status(400).json({ message: "Email is Required" });
        if (!password) return res.status(400).json({ message: "Password is Required" });

        const user = await Users.findOne({ email });
        if (!user) return res.status(404).json({ message: "User Does Not Exists With This Email" });

        const isTruePassword = await bcrypt.compare(password, user.password);
        if (!isTruePassword) return res.status(400).json({ message: "Password Is Incorrect" });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie("refreshToken", refreshToken, {
            http: true,
            secure: false,
        });

        res.status(200).json({
            message: "User Logged In Successfully",
            accessToken,
            refreshToken,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred during Login" });
    }
};

const logout = async (req, res) => {
    try {
        res.clearcookie("refreshToken");
        res.status(200)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occurred during Logout" })
    };
};
export { signUp, login };