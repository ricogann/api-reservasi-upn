const authController = require("./controllers/auth.controller");
const seederController = require("./controllers/seeder.controller");
const fasilitasController = require("./controllers/fasilitas.controller");
const kamarController = require("./controllers/kamar.controller");
const usersController = require("./controllers/users.controller");
const bookingController = require("./controllers/booking.controller");
const campusController = require("./controllers/campus.controller");
const hargaController = require("./controllers/harga.controller");
const miscController = require("./controllers/misc.controller");

const _routes = [
    ["auth", authController],
    ["seeder", seederController],
    ["fasilitas", fasilitasController],
    ["kamar", kamarController],
    ["users", usersController],
    ["booking", bookingController],
    ["campus", campusController],
    ["harga", hargaController],
    ["misc", miscController],
];

const routes = (app) => {
    _routes.forEach((route) => {
        const [url, controller] = route;

        // http://localhost:8080/api
        app.use(`/api/${url}`, controller);
    });
};

module.exports = routes;
