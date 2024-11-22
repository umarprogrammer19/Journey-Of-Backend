import express from "express";
import { addUsers, deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/users.controllers.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Learning Database Connection");
});

router.post("/users", addUsers);

router.get("/users", getAllUsers);

router.get("/users/:id", getSingleUser);

router.delete("/users/:id", deleteUser);

router.put("/users/:id", updateUser);

export default router;