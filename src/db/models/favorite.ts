import { model } from "mongoose";
import { favoriteSchema } from "../schemas/favorite.js";

const Favorite=model("Favorite",favoriteSchema)

export {Favorite};