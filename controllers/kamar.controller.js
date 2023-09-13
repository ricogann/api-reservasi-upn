const m$kamar = require("../modules/kamar.module");
const response = require("../helpers/response");

const { Router } = require("express");

const kamarController = Router();

kamarController.post("/add", async (req, res) => {
    console.log(req.body);
    const result = await m$kamar.addKamar(req.body);

    return response.sendResponse(res, result);
});

kamarController.get("/", async (req, res) => {
    const result = await m$kamar.getKamar();

    return response.sendResponse(res, result);
});

kamarController.get("/:id", async (req, res) => {
    const result = await m$kamar.getKamarById(req.params.id);

    return response.sendResponse(res, result);
});

kamarController.put("/update/:id", async (req, res) => {
    const result = await m$kamar.updateKamar(req.params.id, req.body);

    return response.sendResponse(res, result);
});

kamarController.delete("/delete/:id", async (req, res) => {
    const result = await m$kamar.deleteKamar(req.params.id);

    return response.sendResponse(res, result);
});

module.exports = kamarController;
