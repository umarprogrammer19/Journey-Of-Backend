import express from "express";
import { signUp, login, logout } from "../controllers/users.controllers.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verifyUser", authenticateUser, (req, res) => {
    res.json({ message: "Hey! You Are Logged In", user: req.user });
});

export default router;