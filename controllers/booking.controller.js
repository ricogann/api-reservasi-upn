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

bookingController.put(
    "/upload-bukti/:id",
    upload.single("bukti_pembayaran"),
    async (req, res) => {
        console.log(req.file);
        const result = await m$booking.uploadBukti(req.params.id, req.file);

        return response.sendResponse(res, result);
    }
);

bookingController.put(
    "/upload-sik/:id",
    upload.single("SIK"),
    async (req, res) => {
        console.log(req.file);
        const result = await m$booking.uploadSIK(req.params.id, req.file);

        return response.sendResponse(res, result);
    }
);

bookingController.get("/user/:id", async (req, res) => {
    const result = await m$booking.getBookingByIdUser(req.params.id);

    return response.sendResponse(res, result);
});

bookingController.get("/fasilitas/:id", async (req, res) => {
    const result = await m$booking.getBookingByIdFasilitas(req.params.id);

    return response.sendResponse(res, result);
});

bookingController.put("/verifikasi/:id", async (req, res) => {
    const result = await m$booking.updateStatus(req.params.id, req.body);

    return response.sendResponse(res, result);
});

bookingController.put("/kamarAsrama/:id", async (req, res) => {
    const result = await m$booking.addMahasiswaToKamar(req.params.id, req.body);

    return response.sendResponse(res, result);
});

module.exports = bookingController;
