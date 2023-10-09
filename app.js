const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");
const http = require("http");
const fs = require("fs");

const sslOptions = {
    key: fs.readFileSync("privkey.pem"),
    cert: fs.readFileSync("cert.pem"),
};

const server = http.createServer(app);

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

const initIo = async () => {
    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
        //    transports: ["websocket","polling"],
    });

    const socket = io.on("connection", (sock) => {
        console.log("connect");

        sock.on("disconnect", () => {
            console.log("server disconnect");
        });

        sock.emit("newBooking", "new booking");
        return sock;
    });

    return io;
};

app.get("/", (req, res) => {
    res.status(200).json({
        message: "yep, this works. you can use it now!",
    });
});

routes(app);

app.use("/assets", express.static(`./public`));
server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

console.log("Socket.io initialized");
module.exports = initIo;
