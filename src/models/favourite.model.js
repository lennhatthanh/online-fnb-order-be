import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const favouriteSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        food_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
            required: true,
        },
    },
    { timestamps: true }
);

const Favourite = mongoose.model("Favourite", favouriteSchema);
export default Favourite;
