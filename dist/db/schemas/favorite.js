import mongoose, { Schema } from "mongoose";
var favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    lens: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lens",
    },
    proLens: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProLens",
    },
});
export { favoriteSchema };
