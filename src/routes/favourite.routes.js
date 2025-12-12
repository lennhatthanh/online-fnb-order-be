import express from "express";
import { addFavouriteFoodController, getFavourite, removeFavouriteFoodController } from "../controllers/favourite.controller.js";
import { authorize, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);
router.post("/", authorize("user"), addFavouriteFoodController);
router.delete("/:id", authorize("user"), removeFavouriteFoodController);
router.get("/", authorize("user"), getFavourite);

export default router;
