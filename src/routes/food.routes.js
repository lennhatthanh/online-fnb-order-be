import express from "express";
import {
    createFoodController,
    deleleFoodController,
    getAllFoodController,
    updateFoodController,
} from "../controllers/food.controller.js";
import { authorize, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", protect, authorize("user", "admin"), getAllFoodController);
router.post("/", protect, authorize("admin"), createFoodController);
router.put("/:id", protect, authorize("admin"), updateFoodController);
router.delete("/:id", protect, authorize("admin"), deleleFoodController);

export default router;
