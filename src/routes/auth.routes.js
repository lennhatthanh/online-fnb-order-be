import dotenv from "dotenv";
import express from "express";
import {
    googleLoginController,
    loginController,
    logoutController,
    registerController,
    getProfileController,
    refreshTokenController,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
dotenv.config();

const router = express.Router();

router.post("/google-login", googleLoginController);
router.post("/login", loginValidator, loginController);
router.post("/register", registerValidator, registerController);
router.post("/refresh-token", refreshTokenController);
router.post("/logout", protect, logoutController);
router.get("/me", protect, getProfileController);

export default router;
