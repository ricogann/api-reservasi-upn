const m$booking = require("../modules/booking.module");
const authorization = require("../middlewares/authorization");
const upload = require("../middlewares/multer");
const response = require("../helpers/response");

const { Router } = require("express");

const bookingController = Router();

bookingController.post(
    "/add",
    [authorization, upload.array("foto_booking", 7)],
    async (req, res) => {
        const result = await m$booking.addBooking(req.body, req.files);

        return response.sendResponse(res, result);
    }
);

bookingController.get("/", async (req, res) => {
    const result = await m$booking.getBooking();

    return response.sendResponse(res, result);
});

bookingController.get("/:id", authorization, async (req, res) => {
    const result = await m$booking.getBookingById(req.params.id);

    return response.sendResponse(res, result);
});

bookingController.put(
    "/:id",
    [authorization, upload.array("foto_booking", 3)],
    async (req, res) => {
        const result = await m$booking.updateBooking(
            req.params.id,
            req.body,
            req.files
        );

        return response.sendResponse(res, result);
    }
);

bookingController.delete("/delete/:id", authorization, async (req, res) => {
    const result = await m$booking.deleteBooking(req.params.id);

    return response.sendResponse(res, result);
});

bookingController.delete("/cronjob", async (req, res) => {
    const result = await m$booking.deleteBookingCronJob();

    return response.sendResponse(res, result);
});

bookingController.put(
    "/upload-bukti/:id",
    [authorization, upload.single("bukti_pembayaran")],
    async (req, res) => {
        console.log(req.file);
        const result = await m$booking.uploadBukti(req.params.id, req.file);

        return response.sendResponse(res, result);
    }
);

bookingController.put(
    "/upload-sik/:id",
    [authorization, upload.single("SIK")],
    async (req, res) => {
        console.log(req.file);
        const result = await m$booking.uploadSIK(req.params.id, req.file);

        return response.sendResponse(res, result);
    }
);

bookingController.get("/user/:id", authorization, async (req, res) => {
    const result = await m$booking.getBookingByIdUser(req.params.id);

    return response.sendResponse(res, result);
});

bookingController.get("/fasilitas/:id", authorization, async (req, res) => {
    const result = await m$booking.getBookingByIdFasilitas(req.params.id);

    return response.sendResponse(res, result);
});

bookingController.put("/verifikasi/:id", authorization, async (req, res) => {
    const result = await m$booking.updateStatus(req.params.id, req.body);

    return response.sendResponse(res, result);
});

bookingController.put("/kamarAsrama/:id", authorization, async (req, res) => {
    const result = await m$booking.addMahasiswaToKamar(req.params.id, req.body);

    return response.sendResponse(res, result);
});

module.exports = bookingController;
