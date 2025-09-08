import { connectDB, db } from "../configs/db.js";
import bodyParser from "body-parser";

export const deleteDish = async (req, res) => {
  const recipeId = req.params.id;

  if (recipeId) {
    try {
      await db.query("DELETE FROM ingredients WHERE dish_id = $1", [
        parseInt(recipeId),
      ]);

      await db.query("DELETE FROM dishes WHERE id = $1", [parseInt(recipeId)]);
    } catch (error) {
      console.log("Something went wrong when deleting recipe!");
    }
    res.json({ redirectPath: "/" });
  }
};

export const editPage = async (req, res) => {
  const recipeId = req.params.id;
  let image;
  let name;
  let category;
  let intro;
  let comment;
  let ingredients = [];
  if (recipeId) {
    try {
      const dishRes = await db.query("SELECT * FROM dishes WHERE id = $1", [
        recipeId,
      ]);

      const ingredientRes = await db.query(
        "SELECT * FROM ingredients WHERE dish_id = $1",
        [recipeId]
      );

      const categoryId = dishRes.rows[0].category_id;
      const categoryRes = await db.query(
        "SELECT category FROM categories WHERE id = $1",
        [categoryId]
      );

      name = dishRes.rows[0].name;
      image = dishRes.rows[0].image;
      intro = dishRes.rows[0].intro;
      comment = dishRes.rows[0].proccess;
      category = categoryRes.rows[0].category;
      ingredientRes.rows.forEach((ingredient) => {
        ingredients.push(ingredient);
      });

      res.render("pages/recipe", {
        id: recipeId,
        image: image,
        name: name,
        category: category,
        intro: intro,
        comment: comment,
        ingredients: ingredients,
      });
    } catch (error) {
      console.log("Something went wrong when retrieving information!");
    }
  } else {
    res.render("pages/recipe");
  }
};

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
    const savedDishId = req.body.dishId;

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

    let dishId;
    if (savedDishId) {
      dishId = await db.query(
        "UPDATE dishes SET name = $1, intro = $2, proccess = $3, image = $4, category_id = $5 WHERE id = $6 RETURNING id;",
        [
          name,
          intro,
          comment,
          image,
          parseInt(categoryId),
          parseInt(savedDishId),
        ]
      );

      await db.query("DELETE FROM ingredients WHERE dish_id = $1;", [
        parseInt(savedDishId),
      ]);
    } else {
      dishId = await db.query(
        "INSERT INTO dishes(name, intro, proccess, image, category_id) VALUES($1, $2, $3, $4, $5) RETURNING id;",
        [name, intro, comment, image, parseInt(categoryId)]
      );
    }

    const ingredientsArray = ingredients.split(",");
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
