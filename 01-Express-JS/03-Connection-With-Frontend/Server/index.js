import express from "express";
import "dotenv/config";
import cors from "cors";
const app = express();
const port = process.env.PORT;

const users = [];

// Middleware
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    res.status(200).json(users);
});

app.post("/user", (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const user = {
        id: users.length + 1,
        name,
    };
    users.push(user);
    res.status(201).json({ message: "User Created Successfully", data: users });
});

app.get("/user/:id", (req, res) => {
    const { id } = req.params;
    const index = users.findIndex((user) => user.id === parseInt(id));
    if (index === -1) return res.status(404).json({ message: "User Not Found" });
    res.send(users[index]);
});

app.delete("/user/:id", (req, res) => {
    const { id } = req.params;
    const index = users.findIndex((user) => user.id === parseInt(id));
    if (index === -1) return res.status(404).json({ message: "User Not Found" });
    users.splice(index, 1);
    res.status(202).json({ message: "User Successfully Deleted ", data: users });
});

app.put("/user/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const index = users.findIndex((user) => user.id === parseInt(id));
    if (index === -1) return res.status(404).json({ message: "User Not Found" });
    if (!name) return res.status(400).json({ message: "Name is required To Edit" });
    users[index].name = name;
    res.status(200).json({ message: "User Successfully Edited", data: users });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
