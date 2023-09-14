const m$seeder = require("../modules/seeder.module");
const response = require("../helpers/response");

const { Router } = require("express");

const seederController = Router();

seederController.get("/", async (req, res) => {
    const result = await m$seeder.migrateSeederNew();

    return response.sendResponse(res, result);
});

module.exports = seederController;
