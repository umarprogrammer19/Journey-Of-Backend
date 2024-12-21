import express from "express";
import { dbConnection } from "./src/db/index.js";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

dbConnection().then(() => {
    app.listen(port || 4000, () => {
        console.log("Server Is Running On Port", port);
    });
}).catch(err => {
    console.log("Connection Failed", err.message);
})