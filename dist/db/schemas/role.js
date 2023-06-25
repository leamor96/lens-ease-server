import { Schema } from "mongoose";
var roleSchema = new Schema({
    name: { type: String, unique: true },
});
export { roleSchema };
