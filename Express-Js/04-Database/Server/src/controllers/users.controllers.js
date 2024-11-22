import mongoose from "mongoose";
import Users from "../models/user.models.js";

const addUsers = async (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) return res.status(400).json({ message: "name and age are required" });
    await Users.create({ name, age });
    res.status(201).json({ message: "User created successfully" });
};

const getAllUsers = async (req, res) => {
    const allUsers = await Users.find({});
    res.status(200).json(allUsers);
}

const getSingleUser = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "User not found By This Id" });
    const user = await Users.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
}


export { addUsers, getAllUsers, getSingleUser };