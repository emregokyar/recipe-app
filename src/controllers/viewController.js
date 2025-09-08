import { connectDB, db } from "../configs/db.js";
import bodyParser from "body-parser";

export const getView = async (req, res) => {
  const recipeId = req.params.id;

  if (recipeId) {
    try {
      const dishRes = await db.query("SELECT * FROM dishes WHERE id = $1", [
        parseInt(recipeId),
      ]);

      const ingredientRes = await db.query(
        "SELECT * FROM ingredients WHERE dish_id = $1",
        [parseInt(recipeId)]
      );

      res.render("pages/view", {
        ingredients: ingredientRes.rows,
        dish: dishRes.rows[0]
      });
    } catch (error) {
      console.log("Something went wrong when deleting recipe!", error);
    }
  }
};
