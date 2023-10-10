const bodyParser = require("body-parser");
const cors = require("cors");
const { app, server, PORT } = require("./app");

const routes = require("./routes")(app);

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

server.listen(server.PORT, async () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
