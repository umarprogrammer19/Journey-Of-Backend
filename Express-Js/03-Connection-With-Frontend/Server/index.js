import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

const users = [{
    id: 1,
    name: "Umar Farooq",
}, {
    id: 2,
    name: "Ali Khan",
}, {
    id: 3,
    name: "Ahmed",
}]

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    res.status(200).json(users);
})

app.post("/user", (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400), json({ message: "Name is required" });
    const user = {
        id: users.length + 1,
        name,
    };
    users.push(user);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
