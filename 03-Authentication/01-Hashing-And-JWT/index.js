import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

// First Route
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, (req, res) => {
    console.log("Server is running on port", port);
})
