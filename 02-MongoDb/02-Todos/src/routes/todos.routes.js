import express from "express";
import { addTodos, deleteTodos, getTodos } from "../controllers/todos.controllers.js";

const router = express.Router();

router.get("/todos", getTodos);
router.post("/todos", addTodos);
router.delete("/todos/:id", deleteTodos);

export default router;