import User from "../models/user.model.js";
import { errorRes } from "../utils/response.js";
import jwt from "jsonwebtoken";
export const protect = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        if (!token) {
            errorRes(res, "No token, authorization denied", 401, "NO_TOKEN");
        }
        const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = await User.findById(decode.id).select("-password");
        next();
    } catch (error) {
        errorRes(res, "No token, authorization denied", 401, "NO_TOKEN");
    }
};

export const authorize =
    (...roles) =>
    (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            errorRes(res, "Bạn không có quyền thực hiện hành động này", 403, "FORBIDDEN");
        }
        next();
    };
