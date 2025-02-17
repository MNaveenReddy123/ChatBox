const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.broadcast.emit("message", { msg: "A new user joined the chat", type: "received" });

    socket.on("chatMessage", (msg) => {
        socket.broadcast.emit("message", { msg, type: "received" });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
        io.emit("message", { msg: "A user left the chat", type: "received" });
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
