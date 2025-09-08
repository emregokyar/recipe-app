import express from "express";
import { getAbout } from "../controllers/aboutController.js";  //Importing Controller

const router= express.Router();
router.get("/about", getAbout);

export default router;