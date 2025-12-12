import Food from "../models/food.model.js";

export const deleteFoodService = async (id) => {
    try {
        const foodExists = await Food.findById(id);
        if (!foodExists) {
            const error = new Error();
            error.message = "Food not found";
            error.errorCode = "FOOD_NOT_FOUND";
            error.status = 404;
            throw error;
        }
        const data = await Food.findByIdAndDelete(id);
        return data;
    } catch (error) {
        throw error;
    }
};

export const udpateFoodService = async (id, payload) => {
    try {
        const foodExists = await Food.findById(id);
        if (!foodExists) {
            const error = new Error();
            error.message = "Food not found";
            error.errorCode = "FOOD_NOT_FOUND";
            error.status = 404;
            throw error;
        }
        const food = await Food.findOneAndUpdate({ _id: id }, payload, { new: true });
        return food;
    } catch (error) {
        throw error;
    }
};
