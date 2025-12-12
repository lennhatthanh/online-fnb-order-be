import Cart from "../models/cart.model.js";
import { addCart, removeCart } from "../services/cart.service.js";
import { getCartService } from "../services/order.service.js";
import { errorRes, successRes } from "../utils/response.js";

export const addFoodinCart = async (req, res) => {
    try {
        const data = await addCart(req.user._id, req.body);
        successRes(res, "Add Cart Completed", data);
    } catch (error) {
        errorRes(res, error.messsage);
    }
};

export const removeFoodinCart = async (req, res) => {
    try {
        const data = await removeCart(req.user._id, req.body);
        successRes(res, "Remove Cart Completed", data);
    } catch (error) {
        errorRes(res, error.messsage);
    }
};

export const getCartUser = async (req, res) => {
    try {
        const data = await getCartService(req.user._id);
        successRes(res, "Get Cart Completed", data);
    } catch (error) {
        errorRes(res, error.messsage, error.status, error.errorCode);
    }
};
