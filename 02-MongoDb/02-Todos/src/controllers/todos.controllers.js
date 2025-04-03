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
