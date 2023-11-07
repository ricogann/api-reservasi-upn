const m$fasilitas = require("../modules/fasilitas.module");
const upload = require("../middlewares/multer");
const authorization = require("../middlewares/authorization");
const response = require("../helpers/response");

const { Router } = require("express");

const fasilitasController = Router();

fasilitasController.post(
    "/add",
    authorization,
    upload.fields([
        {
            name: "foto",
            maxCount: 7,
        },
        {
            name: "termservice",
            maxCount: 1,
        },
    ]),
    async (req, res) => {
        const result = await m$fasilitas.addFasilitas(req.body, req.files);

        return response.sendResponse(res, result);
    }
);

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
    // upload.array("foto_fasilitas", 3),
    upload.fields([
        {
            name: "foto",
            maxCount: 7,
        },
        {
            name: "termservice",
            maxCount: 1,
        },
    ]),
    async (req, res) => {
        const result = await m$fasilitas.updateFasilitas(
            req.params.id,
            req.body,
            req.files
        );
        console.log(req.files);

        return response.sendResponse(res, result);
    }
);

fasilitasController.delete("/delete/:id", authorization, async (req, res) => {
    const result = await m$fasilitas.deleteFasilitas(req.params.id);

    return response.sendResponse(res, result);
});

// fasilitasController.put(
//     "/update/:id",
//     upload.array("foto_fasilitas", 3),
//     async (req, res) => {
//         const result = await m$fasilitas.updateFasilitas(
//             req.params.id,
//             req.body,
//             req.files
//         );
//         console.log(req.files);
//         return response.sendResponse(res, result);
//     }
// );

module.exports = fasilitasController;
