import { connectDB, db } from "../configs/db.js";
import bodyParser from "body-parser";

export const recipePage = async (req, res) => {
  res.render("pages/recipe");
};

export const addRecipe = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null; // comes from multer
    const name = req.body.name;
    const category = req.body.category;
    const intro = req.body.intro;
    const comment = req.body.comment;
    const ingredients = req.body.ingredients;

    let categoryId;
    try {
      const result = await db.query(
        "SELECT id FROM categories WHERE category = $1;",
        [category]
      );

      categoryId = result.rows[0].id;
    } catch (error) {
      console.log("Category hasn't created yet! Creating a category.");
      const result = await db.query(
        "INSERT INTO categories(category) VALUES($1) RETURNING id;",
        [category]
      );

      categoryId = result.rows[0].id;
    }

    const dishId = await db.query(
      "INSERT INTO dishes(name, intro, proccess, image, category_id) VALUES($1, $2, $3, $4, $5) RETURNING id;",
      [name, intro, comment, image, parseInt(categoryId)]
    );

    const ingredientsArray = ingredients.split(',');
    ingredientsArray.forEach((ingredient) => {
      db.query("INSERT INTO ingredients(ingredient, dish_id) VALUES($1, $2);", [
        ingredient,
        parseInt(dishId.rows[0].id),
      ]);
    });

    await res.json({
      redirectPath: "/",
    });
  } catch (err) {
    console.log("Error saving recipe!", err);
  }
};
