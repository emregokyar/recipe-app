import express from "express";
import { addPage } from "../controllers/addRecipeController.js";  //Importing Controller

const router= express.Router();
router.get("/add", addPage);

export default router;