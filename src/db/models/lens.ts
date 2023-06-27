import {  model } from "mongoose";
import { lensSchema } from "../schemas/lens.js";

const Lens= model("Lenses", lensSchema);

export {Lens};