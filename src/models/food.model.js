import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image_url: {
            type: String,
            required: true,
        },
        is_available: {
            type: Boolean,
            default: true,
            required: true,
        },
    },
    { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);

export default Food;
