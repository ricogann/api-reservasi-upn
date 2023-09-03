const m$auth = require("../modules/auth.module");
const upload = require("../middlewares/multer");
const response = require("../helpers/response");

const { Router } = require("express");

const authController = Router();

authController.post(
    "/register/mahasiswa",
    upload.single("bukti_regis_mahasiswa"),
    async (req, res) => {
        const result = await m$auth.registerMahasiswa(req.body, req.file);

        return response.sendResponse(res, result);
    }
);

authController.post(
    "/register/account",
    upload.single("bukti_regis"),
    async (req, res) => {
        const result = await m$auth.registerAccount(req.body, req.file);

        return response.sendResponse(res, result);
    }
);

authController.post("/login/mahasiswa", async (req, res) => {
    const result = await m$auth.loginMahasiswa(req.body);

    return response.sendResponse(res, result);
});

authController.post("/login", async (req, res) => {
    const result = await m$auth.loginUmum(req.body);

    return response.sendResponse(res, result);
});

module.exports = authController;
