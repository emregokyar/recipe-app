import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import homeRoute from "./src/routes/home.js";
import addRecRoute from "./src/routes/recipe.js";
import viewRoute from "./src/routes/view.js";
import { connectDB, db } from "./src/configs/db.js";

// Setting up __dirname variable
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Retrieving configs
dotenv.config();
const APP_PORT = process.env.APP_PORT;

const app = express();
const PORT = APP_PORT || 3000;

//Connecting to DB
await connectDB();

// Views setup
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", homeRoute);
app.use("/", addRecRoute);
app.use("/", viewRoute);

// Running App
app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
