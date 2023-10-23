const m$misc = require("../modules/misc.module");
const response = require("../helpers/response");
const upload = require("../middlewares/multer");

const { Router } = require("express");

const miscController = Router();

miscController.get("/", async (req, res) => {
    const result = await m$misc.getMisc();

    return response.sendResponse(res, result);
});

miscController.put(
    "/:id",
    upload.fields([
        { name: "logo_instansi", maxCount: 1 },
        { name: "tanda_tangan", maxCount: 1 },
        { name: "terms_service", maxCount: 1 },
    ]),
    async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        const files = req.files;
        const result = await m$misc.updateMisc(id, body, files);

        return response.sendResponse(res, result);
    }
);

module.exports = miscController;
