import express from "express";
import { getTodos } from "../controllers/todos.controllers.js";

const router = express.Router();

router.get("/todos", getTodos);

export default router;