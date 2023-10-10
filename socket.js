const { Server } = require("socket.io");
const { server } = require("./app");

const io = new Server(server, {
    cors: {
        origin: "*",
    },
    methods: ["GET", "POST"],
    // transports: ["websocket", "polling"],
});

let socket = io.on("connection", (socket) => {
    socket.on("disconnect", () => {
        console.log("Socket Disconnect");
    });
    return socket;
});

module.exports.socket = socket;
