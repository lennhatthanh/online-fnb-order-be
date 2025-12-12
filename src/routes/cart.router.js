import express from "express";
import { authorize, protect } from "../middlewares/auth.middleware.js";
import { addFoodinCart, getCartUser, removeFoodinCart } from "../controllers/cart.controller.js";

const router = express.Router();
router.get("/", protect, authorize("user"), getCartUser);
router.post("/add", protect, authorize("user"), addFoodinCart);
router.post("/remove", protect, authorize("user"), removeFoodinCart);

export default router;
