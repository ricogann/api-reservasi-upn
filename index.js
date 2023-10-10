const App = require("./app");
const server = App;
const routes = require("./routes")(server.app);

server.server.listen(server.PORT, async () => {
    console.log(`Server is running on port http://localhost:${server.PORT}`);
});
