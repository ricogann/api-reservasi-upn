const m$harga = require("../modules/harga.module");
const response = require("../helpers/response");

const { Router } = require("express");

const hargaController = Router();

hargaController.get("/:id", async (req, res) => {
    const result = await m$harga.getHargaById(req.params.id);

    return response.sendResponse(res, result);
});

module.exports = hargaController;
