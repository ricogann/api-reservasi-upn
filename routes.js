const authController = require("./controllers/auth.controller");

const _routes = [["auth", authController]];

const routes = (app) => {
    _routes.forEach((route) => {
        const [url, controller] = route;

        // http://localhost:8080/api
        app.use(`/api/${url}`, controller);
    });
};

module.exports = routes;
