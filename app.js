const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const routes = require("./routes")(app);

class App {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.plugins();
        this.PORT = process.env.PORT || 5000;
    }

    plugins() {
        this.app.use(cors());
        routes;
    }
}

// const server = http.createServer(app);

// const port = process.env.PORT || 5000;

// const io = require("socket.io")(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//     },
//     //    transports: ["websocket","polling"],
// });

// const socket = io.on("connection", (sock) => {
//     console.log("connect");

//     sock.on("disconnect", () => {
//         console.log("server disconnect");
//     });

//     sock.emit("newBooking", "new booking");
//     return sock;
// });

// app.use(cors());
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// app.get("/", (req, res) => {
//     res.status(200).json({
//         message: "yep, this works. you can use it now!",
//     });
// });

// app.use("/assets", express.static(`./public`));
// server.listen(port, () => {
//     console.log(`Server is running on port http://localhost:${port}`);
// });

module.exports = App;
