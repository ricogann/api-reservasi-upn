const m$kamar = require("../modules/kamar.module");
const response = require("../helpers/response");
const authorization = require("../middlewares/authorization");

const { Router } = require("express");

const kamarController = Router();

kamarController.post("/add", authorization, async (req, res) => {
    const result = await m$kamar.addKamar(req.body);

    return response.sendResponse(res, result);
});

kamarController.get("/", authorization, async (req, res) => {
    const result = await m$kamar.getKamar();

    return response.sendResponse(res, result);
});

kamarController.get("/:id", authorization, async (req, res) => {
    const result = await m$kamar.getKamarById(req.params.id);

    return response.sendResponse(res, result);
});

kamarController.put("/update/:id", authorization, async (req, res) => {
    const result = await m$kamar.updateKamar(req.params.id, req.body);

    return response.sendResponse(res, result);
});

kamarController.delete("/delete/:id", authorization, async (req, res) => {
    const result = await m$kamar.deleteKamar(req.params.id);

    return response.sendResponse(res, result);
});

kamarController.put("/mahasiswa/delete-expired/:id", async (req, res) => {
    const result = await m$kamar.deleteExpiredMahasiswa(req.params.id);

    return response.sendResponse(res, result);
});

kamarController.put("/mahasiswa/delete-expired-cronjob", async (req, res) => {
    const result = await m$kamar.deleteExpiredMahasiswaCronJob();

    return response.sendResponse(res, result);
});

module.exports = kamarController;
