import jwt from "jsonwebtoken";

export const isAuthenticatedUser = async (req, res, next) => {
    let token = null;

    if (req.cookies && req.cookies.access_token) {
        token = req.cookies.access_token;
    }
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) res.status(401).json({
        success: false,
        message: "Unauthorized"
    });

    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        console.log(token, tokenData);
        req.user = tokenData;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};