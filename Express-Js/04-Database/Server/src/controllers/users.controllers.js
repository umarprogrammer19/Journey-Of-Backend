import Users from "../models/user.models.js";

const addUsers = async (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) return res.status(400).json({ message: "name and age are required" });
    await Users.create({ name, age });
    res.status(201).json({ message: "User created successfully" });
};

export { addUsers };