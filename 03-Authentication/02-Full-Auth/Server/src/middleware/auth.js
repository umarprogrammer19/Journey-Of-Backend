import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
    const refresJwtToken = req.cookie.refreshToken;
    if (!refresJwtToken) return res.status(404).json({ message: "Jwt Token Not Found" });

    jwt.verify(refresJwtToken, process.env.REFRESH_JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Cannot Verify JWT" });
        req.user = user;
        next();
    });
};