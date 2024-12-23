import express, { Router } from "express";
import { uploadImage } from "../controllers/cloudinary.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);

export default router;