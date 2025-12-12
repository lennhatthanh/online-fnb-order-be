import Cart from "../models/cart.model.js";

export const addCart = async (user_id, items) => {
    try {
        const cartExists = await Cart.findOne({ user_id });
        let result;
        if (cartExists) {
            const foodExists = cartExists.items.find((item) => item.food_id.toString() === items.food_id.toString());
            if (foodExists) {
                foodExists.quantity += 1;
                await cartExists.save();
                result = cartExists;
            } else {
                result = await Cart.findOneAndUpdate(
                    { user_id },
                    {
                        items: [...cartExists.items, items],
                    },
                    { new: true }
                );
            }
        } else {
            result = await Cart.create({ user_id, items: [items] });
        }
        return result;
    } catch (error) {
        throw error;
    }
};

export const removeCart = async (user_id, items) => {
    try {
        const cartExists = await Cart.findOne({ user_id });
        let result;
        if (cartExists) {
            const foodExists = cartExists.items.find((item) => item.food_id.toString() === items.food_id.toString());
            if (foodExists && foodExists.quantity > 1) {
                foodExists.quantity -= 1;
                await cartExists.save();
                result = cartExists;
            } else {
                await Cart.findOneAndDelete({ user_id });
                result = null
            }
        } else {
            const error = new Error();
            error.message = "Food not Found";
            error.errorCode = "FOOD_NOT_FOUND";
            throw error;
        }
        console.log("result", result);
        return result;
    } catch (error) {
        throw error;
    }
};
