import express from "express";
import { addUsers } from "../controllers/users.controllers.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Learning Database Connection");
});

router.post("/users", addUsers);

export default router;