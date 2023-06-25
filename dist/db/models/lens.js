import { model } from "mongoose";
import { lensSchema } from "../schemas/lens.js";
var Lens = model("Lenses", lensSchema);
export { Lens };
