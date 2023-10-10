const { Server } = require("socket.io");
const App = require("./app");
const server = new App();

const io = new Server(server.server, {
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
