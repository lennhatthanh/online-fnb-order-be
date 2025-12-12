import express from "express";
import { authorize, protect } from "../middlewares/auth.middleware.js";
import {
    createOrderController,
    getAllOrder,
    getOrder,
    updateStatusController,
} from "../controllers/order.controller.js";

const router = express.Router();

router.use(protect);
router.post("/", authorize("user"), createOrderController);
router.put("/:id", authorize("admin"), updateStatusController);
router.get("/all", authorize("admin"), getAllOrder);
router.get("/", authorize("user"), getOrder);

export default router;
