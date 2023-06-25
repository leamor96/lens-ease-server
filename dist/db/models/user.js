import { model } from "mongoose";
import { userSchema } from "../schemas/user.js";
var User = model("User", userSchema);
export { User };
