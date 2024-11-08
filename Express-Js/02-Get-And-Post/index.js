import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

const users = [{
    id: 1,
    name: "Umar Farooq",
}, {
    id: 2,
    name: "Anusha Akhter",
}]

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/users", (req, res) => {
    res.send(users);
});

app.post("/user", (req, res) => {
    const { name } = req.body;
    users.push({
        id: users.length + 1,
        name,
    });
    res.send({
        message: "User Added Successfuly",
        data: users,
    })
})

app.listen(port, () => {
    console.log(`Server is Running On Port ${port}`);
})