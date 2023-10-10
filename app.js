const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");

class App {
    constructor() {
        this.app = app;
        this.server = http.createServer(this.app);
        this.plugins();
        this.init();
        this.PORT = process.env.PORT || 5000;
    }

    plugins() {
        this.app.use(cors());
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
        this.app.use("/assets/", express.static("public"));
    }

    init() {
        this.app.get("/", (req, res) => {
            res.status(200).json({
                message: "yep, this works. you can use it now!",
            });
        });
    }
}

module.exports = new App();
