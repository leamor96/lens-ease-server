import { Schema } from "mongoose";
import { Role } from "../../@types.js";

const roleSchema = new Schema<Role>({
  name: {type:String, unique:true},
});

export { roleSchema };
