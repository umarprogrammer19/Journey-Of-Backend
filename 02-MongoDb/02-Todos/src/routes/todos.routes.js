import express from "express";
import { addTodos, getTodos } from "../controllers/todos.controllers.js";

const router = express.Router();

router.get("/todos", getTodos);
router.post("/todos", addTodos);

export default router;