const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");

const sslOptions = {
    key: fs.readFileSync("privkey.pem"),
    cert: fs.readFileSync("cert.pem"),
};

const server = https.createServer(sslOptions, app);

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling", "flashsocket"],
});

const socket = io.on("connection", (socket) => {
    console.log("connect");

    socket.on("disconnect", () => {
        console.log("server disconnect");
    });
    return socket;
});

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
