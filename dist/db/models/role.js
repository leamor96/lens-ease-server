import { model } from "mongoose";
import { roleSchema } from "../schemas/role.js";
var Role = model("Role", roleSchema);
export { Role };
