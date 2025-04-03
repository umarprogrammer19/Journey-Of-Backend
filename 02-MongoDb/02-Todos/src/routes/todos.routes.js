import express from "express";
import { addTodos, deleteTodos, editTodos, getTodos } from "../controllers/todos.controllers.js";

const router = express.Router();

router.get("/todos", getTodos);
router.post("/todos", addTodos);
router.delete("/todos/:id", deleteTodos);
router.put("/todos/:id", editTodos);

export default router;