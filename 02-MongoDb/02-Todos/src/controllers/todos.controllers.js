import mongoose from "mongoose";
import todosModels from "../models/todos.models.js";

export const getTodos = async (req, res) => {
    try {
        const todos = await todosModels.find({});
        if (!todos) return res.status(404).json({ message: "Todos Not found" });
        res.status(200).json({
            message: "Successfuly Fetched The Data",
            todos: todos,
        });
    } catch (error) {
        console.log(error.messge);
        res.status(500).json({
            message: "Internal Server Error",
        });
    };
};

export const addTodos = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({
            message: "All feilds Are Required",
        });
        const newTodo = await todosModels.create({ title });

        if (!newTodo) return res.status(400).json({
            message: "Failed To Create",
        });

        res.status(201).json({
            message: "Created Successfully",
            newTodo
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    };
};

export const deleteTodos = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({
            message: "id not found",
        });

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID." });
        }

        const isTodoFound = await todosModels.findById(id);

        if (!isTodoFound) {
            return res.status(404).json({ message: "Todo Not found." });
        }

        await todosModels.findByIdAndDelete(id);

        res.status(201).json({
            message: "Deleted Successfully",
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error",
        });
    };
};

export const editTodos = async (req, res) => {
    try {
        const { id } = req.params;
        const { newTitle } = req.body;
        if (!id) return res.status(400).json({
            message: "id not found",
        });

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID." });
        }

        const isTodoFound = await todosModels.findById(id);

        if (!isTodoFound) {
            return res.status(404).json({ message: "Todo Not found." });
        }

        const editedTodo = await todosModels.findByIdAndUpdate(id, { title: newTitle }, { new: true });

        res.status(201).json({
            message: "Edited Successfully",
            editedTodo,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error",
        });
    };
};