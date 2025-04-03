import express from "express";

const app = express();
const port = 8000;
app.use(express.json());

const todos = [{
    id: 1,
    item: "Item1"
}, {
    id: 2,
    item: "Item2"
}, {
    id: 3,
    item: "Item3"
}];

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.get("/item", (req, res) => {
    res.status(200).json({
        message: "Items Get Success",
        todos
    })
});

app.post("/addItems", (req, res) => {
    const { item } = req.body;
    if (!item) return res.status(400).json("Please Enter An Item");
    todos.push({
        id: todos.length + 1,
        item,
    });
    res.status(201).json({
        message: "Items Added Success",
        todos
    });
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;

    const index = todos.findIndex((item) => item.id === parseInt(id));

    if (index == -1) return res.status(404).json("Item Not Found");
    todos.splice(index, 1);
    res.status(200).json({
        message: "Item Deleted Success",
        newItems: todos,
    })
});

app.put("/edit/:id", (req, res) => {
    const { id } = req.params;
    const { newItem } = req.body;
    if (!newItem) return res.status(400).json("Please Enter An Item");
    const index = todos.findIndex((item) => item.id === parseInt(id));

    if (index == -1) return res.status(404).json("Item Not Found");
    todos.splice(index, 1, {
        id: parseInt(id),
        item: newItem
    });
    res.status(200).json({
        message: "Item Edit Success",
        newItems: todos,
    })
});

app.listen(port, () => {
    console.log("Server is Running on the port", port);
});