import Order from "../models/order.model.js";
import { createOrder, updateStatusOrder } from "../services/order.service.js";
import { getIO } from "../socket/socket.js";
import { errorRes, successRes } from "../utils/response.js";

export const createOrderController = async (req, res) => {
    try {
        const result = await createOrder(req.user._id, req.body.payment_method);
        try {
            const io = await getIO();
            io.emit("CREATE_ORDER", {
                message: "Có đơn hàng mới",
                data: result,
            });
        } catch (error) {
            console.error("❌ Socket error:", error.message);
        }
        successRes(res, "Created order successfull", result);
    } catch (error) {
        errorRes(res, error.message, error.status);
    }
};

export const updateStatusController = async (req, res) => {
    try {
        const data = await updateStatusOrder(req.params.id, req.body.status);
        successRes(res, "Changed status succesfull", data);
    } catch (error) {
        errorRes(res, error.message, error.status);
    }
};

export const getAllOrder = async (req, res) => {
    try {
        const data = await Order.find().populate("user_id").populate("items.food_id");
        successRes(res, "Get order successfull", data);
    } catch (error) {
        errorRes(res, error.message);
    }
};

export const getOrder = async (req, res) => {
    try {
        const data = await Order.find({ user_id: req.user._id }).populate("items.food_id");
        successRes(res, "Get order successfull", data);
    } catch (error) {
        errorRes(res, error.message);
    }
};
