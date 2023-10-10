const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const { app, server, PORT } = require("./app");

const routes = require("./routes");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

routes(app);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "yep, this works. you can use it now!",
    });
});

app.use("/assets", express.static("./public"));
server.listen(PORT, async () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
