import { model } from "mongoose";
import { proLensSchema } from "../schemas/proLens.js";

const ProLens = model("proLenses", proLensSchema);

export { ProLens };
