import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";

export const createOrder = async (user_id, payment_method) => {
    try {
        const cartExists = await Cart.findOne({ user_id });
        if (!cartExists) {
            const error = new Error();
            error.message = "Cart not found";
            error.errorCode = "CART_NOT_FOUND";
            error.status = 404;
        }
        const total_amount = cartExists.items
            .reduce((accumulator, currentItem) => {
                return accumulator + currentItem.price * currentItem.quantity;
            }, 0)
            .toFixed(2);
        const order = await Order.create({ user_id, total_amount, items: cartExists.items, payment_method });
        await Cart.deleteOne({ user_id });
        return order;
    } catch (error) {
        throw error;
    }
};

export const updateStatusOrder = async (id, status) => {
    try {
        const orderExists = await Order.findById(id);
        if (!orderExists) {
            const error = new Error();
            error.message = "Order not found";
            error.errorCode = "ORDER_NOT_FOUND";
            error.status = 404;
        }
        const order = await Order.findByIdAndUpdate(
            id,
            {
                status,
            },
            { new: true }
        );
        return order;
    } catch (error) {
        throw error;
    }
};

export const getCartService = async (user_id) => {
    try {
        const data = await Cart.findOne({ user_id });
        if (!data) {
            const error = new Error();
            error.message = "Cart not found";
            error.errorCode = "CART_NOT_FOUND";
            error.status = 404;
            throw error;
        }
        return data;
    } catch (error) {
        throw error;
    }
};
