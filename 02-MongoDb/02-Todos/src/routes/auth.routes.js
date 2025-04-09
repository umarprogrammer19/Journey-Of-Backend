import express from "express";
import { getUser, login, logoutUser, signup } from "../controllers/auth.controllers.js";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", isAuthenticatedUser, logoutUser);
router.get("/user", isAuthenticatedUser, getUser);

export default router;