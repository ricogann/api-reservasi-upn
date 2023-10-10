const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

module.exports = {
    app,
    server,
    PORT,
};
