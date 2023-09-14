const m$auth = require("../modules/auth.module");
const upload = require("../middlewares/multer");
const response = require("../helpers/response");

const { Router } = require("express");

const authController = Router();

authController.post(
    "/register/mahasiswa",
    upload.single("bukti_identitas"),
    async (req, res) => {
        const result = await m$auth.registerMahasiswa(req.body, req.file);

        return response.sendResponse(res, result);
    }
);

authController.post(
    "/register/umum",
    upload.single("bukti_identitas"),
    async (req, res) => {
        const result = await m$auth.registerUmum(req.body, req.file);

        return response.sendResponse(res, result);
    }
);

authController.post(
    "/register/dosen",
    upload.single("bukti_identitas"),
    async (req, res) => {
        const result = await m$auth.registerDosen(req.body, req.file);

        return response.sendResponse(res, result);
    }
);

authController.post("/login/mahasiswa", async (req, res) => {
    const result = await m$auth.loginMahasiswa(req.body);

    return response.sendResponse(res, result);
});

authController.post("/login/umum", async (req, res) => {
    const result = await m$auth.loginUmum(req.body);

    return response.sendResponse(res, result);
});

authController.post("/login/dosen", async (req, res) => {
    const result = await m$auth.loginDosen(req.body);

    return response.sendResponse(res, result);
});

authController.post("/login/admin", async (req, res) => {
    const result = await m$auth.loginAdmin(req.body);

    return response.sendResponse(res, result);
});

module.exports = authController;
