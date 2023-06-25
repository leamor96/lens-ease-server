import { model } from "mongoose";
import { favoriteSchema } from "../schemas/favorite.js";
var Favorite = model("Favorite", favoriteSchema);
export { Favorite };
