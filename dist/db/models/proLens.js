import { model } from "mongoose";
import { proLensSchema } from "../schemas/proLens.js";
var ProLens = model("proLenses", proLensSchema);
export { ProLens };
