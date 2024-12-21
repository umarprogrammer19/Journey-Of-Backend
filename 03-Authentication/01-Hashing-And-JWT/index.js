import express, { json } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT;
app.use(express.json());


const jwtToken = jwt.sign({ email: "uhhfj0345@gmail.com", }, "secretKJwtKey", { expiresIn: "1h" });
console.log(jwtToken);

const verify = jwt.verify(jwtToken, "secretKJwtKey");
console.log(verify);

app.get("/", (req, res) => {
    res.send("Hello World");
});


app.listen(port, (req, res) => {
    console.log("Server is running on port", port);
})