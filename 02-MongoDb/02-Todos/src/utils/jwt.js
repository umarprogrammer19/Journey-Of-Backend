import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
    return jwt.sign({
        email: user.email,
        id: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};