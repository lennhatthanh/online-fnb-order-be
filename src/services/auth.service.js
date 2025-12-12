import { Error } from "mongoose";
import User from "../models/user.model.js";
import generateToken from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";
export const loginService = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error();
            error.message = "Email or password is incorrect";
            error.errorCode = "INVALID_CREDENTIALS";
            throw error;
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            const error = new Error();
            error.message = "Email or password is incorrect";
            error.errorCode = "INVALID_CREDENTIALS";
            throw error;
        }
        const tokens = generateToken(user._id);
        await User.findOneAndUpdate(user._id, {
            refreshToken: tokens.refreshToken,
        });
        return tokens;
    } catch (error) {
        throw error;
    }
};

export const registerService = async ({ name, email, password, role = "admin" }) => {
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            const error = new Error();
            error.message = "User already exists";
            error.errorCode = "USER_ALREADY_EXISTS";
            throw error;
        }
        const user = await User.create({ name, email, password, role });
        const tokens = generateToken(user._id);
        return {
            accessToken: tokens.accessToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    } catch (error) {
        throw error;
    }
};

export const refreshTokenProcess = async (refreshTokenFromCookie) => {
    try {
        if (!refreshTokenFromCookie) {
            throw new Error("Refresh token không tồn tại");
        }
        let decoded;
        try {
            decoded = jwt.verify(refreshTokenFromCookie, process.env.JWT_REFRESH_SECRET);
        } catch (error) {
            throw new Error("Refresh token không hợp lệ");
        }

        const user = await User.findById(decoded.id).select("+refreshToken");

        if (!user || user.refreshToken !== refreshTokenFromCookie) {
            throw new Error("Refresh token không hợp lệ");
        }
        const tokens = generateToken(user._id);
        return tokens.accessToken;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async (id) => {
    await User.findByIdAndUpdate(id, { refreshToken: null });
};
