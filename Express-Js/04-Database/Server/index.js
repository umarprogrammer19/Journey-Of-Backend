import express from "express";
import "dotenv/config";
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Leaning Database Connection");
});

app.listen(port, () => {
    console.log(`Server Is Running On The Port ${port}`);
});