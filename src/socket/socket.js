import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        origin: [
            "https://online-fnb-order-fe.vercel.app",
            "http://localhost:5173"
        ]
    });

    io.on("connection", (socket) => {
        console.log(`✅ Client kết nối: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`❌ Client ngắt kết nối: ${socket.id}`);
        });
    });
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io chưa được khởi tạo!");
    }
    return io
};
