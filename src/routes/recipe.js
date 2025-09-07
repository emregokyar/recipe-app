import express from "express";
import { recipePage, addRecipe } from "../controllers/recipeController.js"; //Importing Controller
import upload from "../configs/storage.js";

const router = express.Router();
router.get("/add", recipePage);
router.post("/add", upload.single("image"), addRecipe);

export default router;
