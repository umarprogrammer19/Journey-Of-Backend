import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    console.log("Hello World");
});

app.listen(port, () => {
    console.log(`Server is Running On Port ${port}`);
})