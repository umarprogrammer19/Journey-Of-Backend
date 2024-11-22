import express from "express";
import "dotenv/config";
import connectDatabase from "./src/db/index.js"
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Leaning Database Connection");
});

connectDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server Is Running On The Port ${port}`);
    });
}).catch(err => {
    console.log(`Connection Failed ${err.message}`);
})