import express from "express";
import { dbConnection } from "./src/db/index.js";
import "dotenv/config";
import cors from "cors";
import router from "./src/routes/users.routes.js";
import cookieParser from "cookie-parser"

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.use("/api/v1",router);

dbConnection()
.then(() => {
    app.listen(port || 4000, () => {
        console.log("Server Is Running On Port", port);
    });
})
.catch(err => {
    console.log("Connection Failed", err.message);
});