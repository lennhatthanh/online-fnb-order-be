import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import DBConnect from "./config/db.js";
import express from "express";
import { initSocket } from "./socket/socket.js";
import auth from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import food from "./routes/food.routes.js";
import favourite from "./routes/favourite.routes.js";
import cart from "./routes/cart.router.js";
import order from "./routes/order.routes.js";
dotenv.config();
const app = express();
const server = http.createServer(app);
app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: ["POST", "GET", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
initSocket(server);
app.use(cookieParser());
app.use(express.json());
DBConnect();
app.use("/api/auth", auth);
app.use("/api/food", food);
app.use("/api/favourite", favourite);
app.use("/api/cart", cart);
app.use("/api/order", order);
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
