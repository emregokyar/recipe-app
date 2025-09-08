import { connectDB, db } from "../configs/db.js";

export const homePage = async (req, res) => {
  const categoryId = req.query.categoryId;
  let recipes = [];
  let categories = [];

  try {
    if (categoryId) {
      const result = await db.query(
        `SELECT dishes.id, name, intro, proccess, image, category_id  
        FROM dishes JOIN categories
        ON dishes.category_id = categories.id WHERE categories.id = $1`,
        [parseInt(categoryId)]
      );
      result.rows.forEach((recipe) => {
        recipes.push(recipe);
      });
    } else {
      const result = await db.query("SELECT * FROM dishes");
      result.rows.forEach((recipe) => {
        recipes.push(recipe);
      });
    }

    const categoryResult = await db.query("SELECT * FROM categories");
    categoryResult.rows.forEach((category) => {
      categories.push(category);
    });
  } catch (error) {
    console.log(
      "Something went wrongn while retrieving information from database.",
      error
    );
  }

  res.render("pages/home", {
    recipes: recipes,
    categories: categories,
  });
};
