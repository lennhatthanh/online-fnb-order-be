import User from "../models/user.model.js";
import admin from "../config/firebase.js";
import { errorRes, successRes } from "../utils/response.js";
import generateToken from "../utils/generateTokens.js";
import { validationResult } from "express-validator";
import { loginService, logoutUser, refreshTokenProcess, registerService } from "../services/auth.service.js";
const COOKIE_OPTIONS = {
    httpOnly: true, // Cookie chỉ đọc từ server, client không truy cập được → tăng bảo mật
    secure: false, // Để false khi chạy local. Lên production (HTTPS) thì set thành true
    sameSite: "strict", // Giảm nguy cơ tấn công CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // Thời gian sống của cookie: 7 ngày
};
export const googleLoginController = async (req, res) => {
    try {
        const { token: idToken } = req.body;

        if (!idToken) {
            return errorRes(res, "Token is required");
        }
        const tokenParts = idToken.split(".");
        if (tokenParts.length !== 3) {
            return errorRes(res, "Invalid token format. Firebase ID token must have 3 parts.");
        }
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email, name, picture } = decodedToken;
        let user = await User.findOne({ email });
        if (user) {
            if (!user.googleId) {
                user.googleId = uid;
                user.avatar = picture || user.avatar;
                user.authType = "google";
                await user.save();
            }
        } else {
            const randomPassword = Math.random().toString(36).slice(-8);
            user = await User.create({
                googleId: uid,
                email,
                name,
                avatar: picture,
                authType: "google",
                password: randomPassword,
            });
        }
        const tokens = generateToken(user._id);
        await User.findByIdAndUpdate(user._id, {
            refreshToken: tokens.refreshToken,
        });
        res.cookie("refreshToken", tokens.refreshToken, COOKIE_OPTIONS);
        successRes(res, "Đăng nhập thành công", {
            accessToken: tokens.accessToken,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                role: user.role,
            },
        });
    } catch (error) {
        if (error.code === "auth/argument-error") {
            return errorRes("Invalid Firebase ID token format", 400, error.message);
        }

        // Token hết hạn
        if (error.code === "auth/id-token-expired") {
            return errorRes("Firebase ID token has expired", 400, error.message);
        }
        errorRes(res, "Authentication failed", 401);
    }
};

export const loginController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formatted = errors.array().map((err) => ({
                field: err.param,
                message: err.msg,
            }));
            errorRes(res, "Validation errors", 400, formatted);
        }
        const { email, password } = req.body;
        const token = await loginService({ email, password });
        res.cookie("refreshToken", token.refreshToken, COOKIE_OPTIONS);
        successRes(res, "User login Successfull", { accessToken: token.accessToken });
    } catch (error) {
        errorRes(res, error.message);
    }
};

export const registerController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formatted = errors.array().map((err) => ({
                field: err.param,
                message: err.msg,
            }));
            errorRes(res, "Validation errors", 400, formatted);
        }
        const { name, email, password } = req.body;
        const result = await registerService({ name, email, password });
        successRes(res, "User register successfull", result);
    } catch (error) {
        errorRes(res, error.message);
    }
};

export const refreshTokenController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const token = await refreshTokenProcess(refreshToken);
        successRes(res, "Lấy token mới thành công", { accessToken: token });
    } catch (error) {
        errorRes(res, error.message);
    }
};

export const logoutController = async (req, res) => {
    try {
        await logoutUser(req.user.id);
        res.clearCookie("refreshToken");
        successRes(res, "Complete");
    } catch (error) {
        errorRes(res, error.message);
    }
};

export const getProfileController = async (req, res) => {
    try {
        const user = req.user;
        successRes(res, "User profile retrieved successfully", { user });
    } catch (error) {
        errorRes(res, error.message);
    }
};
