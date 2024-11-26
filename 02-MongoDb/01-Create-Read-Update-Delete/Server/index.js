import express from "express";
import "dotenv/config";
import connectDatabase from "./src/db/index.js";
import userRoutes from "./src/routes/users.routes.js";
import cors from "cors";

// Middle Ware
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/v1", userRoutes);

connectDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server Is Running On The Port ${port}`);
    });
}).catch(err => {
    console.log(`Connection Failed ${err.message}`);
})
