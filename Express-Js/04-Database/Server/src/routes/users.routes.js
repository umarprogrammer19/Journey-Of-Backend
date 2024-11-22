import express from "express";
import { addUsers, getAllUsers, getSingleUser } from "../controllers/users.controllers.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Learning Database Connection");
});

router.post("/users", addUsers);

router.get("/users", getAllUsers);

router.get("/users/:id", getSingleUser);

export default router;