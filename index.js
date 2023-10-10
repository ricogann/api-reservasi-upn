const { Server } = require("socket.io");
const App = require("./app");
const server = new App();

const io = new Server(server.server, {
    cors: {
        origin: "*",
    },
    // transports: ["websocket", "polling"],
    // allowEIO3: true,
});

let socket = io.on("connection", (socket) => {
    socket.on("disconnect", () => {
        console.log("Socket Disconnect");
    });
    return socket;
});

server.server.listen(server.PORT, async () => {
    console.log("APp running");
});

module.exports.socket = socket;
