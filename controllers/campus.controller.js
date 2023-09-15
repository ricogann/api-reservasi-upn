const m$campus = require("../modules/campus.module");
const response = require("../helpers/response");

const { Router } = require("express");

const campusController = Router();

campusController.get("/fakultas", async (req, res) => {
    const result = await m$campus.getFakultas();

    return response.sendResponse(res, result);
});

campusController.get("/prodi", async (req, res) => {
    const result = await m$campus.getProdi();

    return response.sendResponse(res, result);
});

campusController.get("/tahun-ajaran", async (req, res) => {
    const result = await m$campus.getTahunAjaran();

    return response.sendResponse(res, result);
});

module.exports = campusController;
