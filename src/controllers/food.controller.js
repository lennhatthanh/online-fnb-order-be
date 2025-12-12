import { body } from "express-validator";
import Food from "../models/food.model.js";
import { deleteFoodService, udpateFoodService } from "../services/food.service.js";
import { errorRes, successRes } from "../utils/response.js";

export const getAllFoodController = async (req, res) => {
    try {
        const food = await Food.find();
        successRes(res, "Get all food successfully", food);
    } catch (error) {
        errorRes(res, error.message);
    }
};
export const createFoodController = async (req, res) => {
    try {
        const { name, description, price, image_url, is_available } = req.body;
        const food = await Food.create({ name, description, price, image_url, is_available });
        successRes(res, "Create food successfully", food);
    } catch (error) {
        errorRes(res, error.message);
    }
};

export const deleleFoodController = async (req, res) => {
    try {
        const food = await deleteFoodService(req.params.id);
        successRes(res, "Delete food successfully", food);
    } catch (error) {
        errorRes(res, error.message, error.status);
    }
};

export const updateFoodController = async (req, res) => {
    try {
        const food = await udpateFoodService(req.params.id, req.body);
        successRes(res, "Update food successfully", food);
    } catch (error) {
        errorRes(res, error.message, error.status);
    }
};
