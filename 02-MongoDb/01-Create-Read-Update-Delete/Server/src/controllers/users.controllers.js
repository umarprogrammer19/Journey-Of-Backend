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

const deleteUser = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "User not found By This Id" });
    await Users.findByIdAndDelete(id);
    res.status(202).json({ message: "User Deleted Successfully", users: await Users.find({}) });
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "User not found By This Id" });
    const { name, age } = req.body;
    if (!name && !age) return res.status(400).json({ message: "name OR age are required" });
    if (name) await Users.findByIdAndUpdate(id, { name }, { new: true });
    if (age) await Users.findByIdAndUpdate(id, { age }, { new: true });
    res.status(202).json({ message: "User Updated Successfully", users: await Users.find({}) });
}

export { addUsers, getAllUsers, getSingleUser, deleteUser, updateUser };