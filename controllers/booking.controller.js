const m$booking = require("../modules/booking.module");
const upload = require("../middlewares/multer");
const response = require("../helpers/response");

const { Router } = require("express");

const bookingController = Router();

bookingController.post(
    "/add",
    upload.array("foto_booking", 7),
    async (req, res) => {
        const result = await m$booking.addBooking(req.body, req.files);

        return response.sendResponse(res, result);
    }
);

bookingController.get("/", async (req, res) => {
    const result = await m$booking.getBooking();

    return response.sendResponse(res, result);
});

bookingController.get("/:id", async (req, res) => {
    console.log(req.params.id);
    const result = await m$booking.getBookingById(req.params.id);

    return response.sendResponse(res, result);
});

bookingController.put(
    "/:id",
    upload.array("foto_booking", 3),
    async (req, res) => {
        const result = await m$booking.updateBooking(
            req.params.id,
            req.body,
            req.files
        );

        return response.sendResponse(res, result);
    }
);

bookingController.delete("/delete/:id", async (req, res) => {
    const result = await m$booking.deleteBooking(req.params.id);

    return response.sendResponse(res, result);
});

module.exports = bookingController;
