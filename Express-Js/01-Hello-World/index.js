import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/about", (req, res) => {
    res.send("Hello World From About Page");
});

app.get("/services", (req, res) => {
    res.send("Hello World From Service Page");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})