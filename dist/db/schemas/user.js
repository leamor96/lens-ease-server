import { Schema } from "mongoose";
import { lensSchema } from "./lens.js";
import { proLensSchema } from "./proLens.js";
var userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    favoritesLens: [lensSchema],
    favoritesProLens: [proLensSchema],
});
export { userSchema };
