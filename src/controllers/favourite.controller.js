import Favourite from "../models/favourite.model.js";
import { addFavouriteFoodService, removeFavouriteFoodService } from "../services/favourite.service.js";
import { errorRes, successRes } from "../utils/response.js";

export const addFavouriteFoodController = async (req, res) => {
    try {
        const result = await addFavouriteFoodService(req.user._id, req.body._id);

        successRes(res, "Added favourite successfully", result);
    } catch (error) {
        errorRes(res, error.message, error.status);
    }
};

export const removeFavouriteFoodController = async (req, res) => {
    try {
        const result = await removeFavouriteFoodService(req.params.id);
        successRes(res, "Removed favourite successfully", result);
    } catch (error) {
        errorRes(res, error.message, error.status);
    }
};

export const getFavourite = async (req, res) => {
    try {
        const result = await Favourite.find({ user_id: req.user._id });
        successRes(res, "Get favourite successfully", result);c
    } catch (error) {
        errorRes(res, error.message, error.status);
    }
};
