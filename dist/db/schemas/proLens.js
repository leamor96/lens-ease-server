import { Schema } from "mongoose";
var proLensSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lensType: {
        type: String,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
    diameter: {
        type: String,
        required: true,
    },
    sphRange: {
        minus: {
            type: [Number],
            default: null,
            validate: {
                validator: function (range) {
                    return range.length === 1 || range.length === 2;
                },
                message: "Invalid sphRange for minus. Should have 1 or 2 values.",
            },
        },
        plus: {
            type: [Number],
            default: null,
            validate: {
                validator: function (range) {
                    return range.length === 1 || range.length === 2;
                },
                message: "Invalid sphRange for plus. Should have 1 or 2 values.",
            },
        },
    },
    adjustmentHeight: {
        type: String,
        default: null,
    },
    coating: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});
export { proLensSchema };
