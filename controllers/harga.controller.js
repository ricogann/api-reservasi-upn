const m$harga = require("../modules/harga.module");
const upload = require("../middlewares/multer");
const response = require("../helpers/response");

const { Router } = require("express");

const hargaController = Router();

hargaController.post("/add", async (req, res) => {
    const result = await m$harga.addHarga(req.body);

    return response.sendResponse(res, result);
});

hargaController.get("/", async (req, res) => {
    const result = await m$harga.getHarga();

    return response.sendResponse(res, result);
});

hargaController.get("/:id", async (req, res) => {
    console.log(req.params.id);
    const result = await m$harga.gethargaById(req.params.id);

    return response.sendResponse(res, result);
});

hargaController.put("/:id", upload.array("foto_harga", 3), async (req, res) => {
    const result = await m$harga.updateHarga(
        req.params.id,
        req.body,
        req.files
    );

    return response.sendResponse(res, result);
});

hargaController.delete("/delete/:id", async (req, res) => {
    const result = await m$harga.deleteHarga(req.params.id);

    return response.sendResponse(res, result);
});

module.exports = hargaController;
