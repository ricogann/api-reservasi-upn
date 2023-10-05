const m$misc = require("../modules/misc.module");
const response = require("../helpers/response");

const { Router } = require("express");

const miscController = Router();

miscController.get("/", async (req, res) => {
    const result = await m$misc.getMisc();

    return response.sendResponse(res, result);
});

miscController.put("/:id", async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const result = await m$misc.updateMisc(id, body);

    return response.sendResponse(res, result);
});

module.exports = miscController;
