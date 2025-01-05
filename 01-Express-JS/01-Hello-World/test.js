import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/data", (req, res) => {
    res.json({
        name: "Shahnawaz",
        id: 1,
        age: 19,
    });
});

app.listen(8080, () => {
    console.log("Server Is Running On Port", 8080);
})