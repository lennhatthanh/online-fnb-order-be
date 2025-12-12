import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const orderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        total_amount: {
            type: Number,
            required: true,
        },
        items: [
            {
                food_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Food",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        payment_method: {
            type: String,
            enum: ["Cash", "Banking"],
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "paid", "completed", "cancelled"],
            required: true,
            default: "pending"
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
