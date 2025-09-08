import express from "express";
import { getView } from "../controllers/viewController.js"; //Importing Controller

const router = express.Router();
router.get("/view/:id", getView);

export default router;