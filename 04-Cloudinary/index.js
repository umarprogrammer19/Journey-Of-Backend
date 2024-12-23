import express from "express";
import "dotenv/config";
import router from "./src/routes/image.route.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/v1", router);

app.get("/", (req, res) => {
    res.send("Hello World");
});


app.listen(port, () => {
    console.log("Server Is Running On The Port", port);
})