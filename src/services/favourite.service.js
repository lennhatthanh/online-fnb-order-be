import Favourite from "../models/favourite.model.js";

export const addFavouriteFoodService = async (user_id, food_id) => {
    try {
        const favouriteExists = await Favourite.findOne({ food_id });
        if (favouriteExists) {
            const error = new Error();
            error.message = "Favourite realdy exists";
            error.errorCode = "FAVOURITE_ALREADY_FOUND";
            error.status = 404;
            throw error;
        }
        const favoutire = await Favourite.create({ user_id, food_id });
        return favoutire;
    } catch (error) {
        throw error;
    }
};

export const removeFavouriteFoodService = async (id) => {
    try {
        const favouriteExists = await Favourite.findById(id);
        if (!favouriteExists) {
            const error = new Error();
            error.message = "Favourite not found";
            error.errorCode = "FAVOURITE_NOT_FOUND";
            error.status = 404;
            throw error;
        }
        const favoutire = await Favourite.findByIdAndDelete(id);
        return favoutire;
    } catch (error) {
        throw error;
    }
};
