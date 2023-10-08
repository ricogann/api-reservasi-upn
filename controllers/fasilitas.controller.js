const m$fasilitas = require("../modules/fasilitas.module");
const upload = require("../middlewares/multer");
const response = require("../helpers/response");

const { Router } = require("express");

const fasilitasController = Router();

fasilitasController.post("/add", upload.array("foto", 7), async (req, res) => {
    const result = await m$fasilitas.addFasilitas(req.body, req.files);

    return response.sendResponse(res, result);
});

fasilitasController.get("/", async (req, res) => {
    const result = await m$fasilitas.getFasilitas();

    return response.sendResponse(res, result);
});

fasilitasController.get("/:id", async (req, res) => {
    console.log(req.params.id);
    const result = await m$fasilitas.getFasilitasById(req.params.id);

    return response.sendResponse(res, result);
});

fasilitasController.put(
    "/:id",
    upload.array("foto_fasilitas", 3),
    async (req, res) => {
console.log(req.body, req.files);
        const result = await m$fasilitas.updateFasilitas(
            req.params.id,
            req.body,
            req.files
        );

        return response.sendResponse(res, result);
    }
);

fasilitasController.delete("/delete/:id", async (req, res) => {
    const result = await m$fasilitas.deleteFasilitas(req.params.id);

    return response.sendResponse(res, result);
});

fasilitasController.put(
    "/update/:id",
    upload.array("foto_fasilitas", 3),
    async (req, res) => {
        const result = await m$fasilitas.updateFasilitas(
            req.params.id,
            req.body,
            req.files
        );

        return response.sendResponse(res, result);
    }
);

module.exports = fasilitasController;
