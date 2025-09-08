import express from "express";
import {
  recipePage,
  addRecipe,
  editPage,
  deleteDish
} from "../controllers/recipeController.js"; //Importing Controller
import upload from "../configs/storage.js";

const router = express.Router();
router.get("/add", recipePage);
router.post("/add", upload.single("image"), addRecipe);
router.get("/edit/:id", editPage);
router.delete("/delete/:id", deleteDish);

export default router;
