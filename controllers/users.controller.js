const m$users = require("../modules/users.module");
const response = require("../helpers/response");
const authorization = require("../middlewares/authorization");

const { Router } = require("express");

const usersController = Router();

usersController.get("/account", authorization, async (req, res) => {
    const result = await m$users.getAccount();

    return response.sendResponse(res, result);
});

usersController.get("/umum", authorization, async (req, res) => {
    const result = await m$users.getUmum();

    return response.sendResponse(res, result);
});

usersController.get("/mahasiswa", authorization, async (req, res) => {
    const result = await m$users.getMahasiswa();

    return response.sendResponse(res, result);
});

usersController.get("/dosen", authorization, async (req, res) => {
    const result = await m$users.getDosen();

    return response.sendResponse(res, result);
});

usersController.get("/account/:id", authorization, async (req, res) => {
    const result = await m$users.getAccountById(req.params.id);

    return response.sendResponse(res, result);
});

usersController.put(
    "/account/updateStatus/:id",
    authorization,
    async (req, res) => {
        const result = await m$users.updateStatus(req.params.id, req.body);

        return response.sendResponse(res, result);
    }
);

usersController.put(
    "/mahasiswa/updateStatus/:id",
    authorization,
    async (req, res) => {
        const result = await m$users.updateStatusMahasiswa(
            req.params.id,
            req.body
        );

        return response.sendResponse(res, result);
    }
);

usersController.delete("/umum/delete/:id", authorization, async (req, res) => {
    const result = await m$users.deleteUmum(req.params.id);

    return response.sendResponse(res, result);
});

usersController.delete("/dosen/delete/:id", authorization, async (req, res) => {
    const result = await m$users.deleteDosen(req.params.id);

    return response.sendResponse(res, result);
});

usersController.delete(
    "/mahasiswa/delete/:id",
    authorization,
    async (req, res) => {
        const result = await m$users.deleteMahasiswa(req.params.id);

        return response.sendResponse(res, result);
    }
);

usersController.put(
    "/account/verifikasi/:id",
    authorization,
    async (req, res) => {
        const result = await m$users.updateStatusAccount(
            req.params.id,
            req.body
        );

        return response.sendResponse(res, result);
    }
);

usersController.post(
    "/mahasiswa/check/:id",
    authorization,
    async (req, res) => {
        const result = await m$users.checkExpiredMahasiswa(req.params.id);

        return response.sendResponse(res, result);
    }
);

usersController.post("/checkemail", async (req, res) => {
    const result = await m$users.checkEmail(req.body);

    return response.sendResponse(res, result);
});

usersController.put("/resetpassword", async (req, res) => {
    const result = await m$users.resetPassword(
        req.body.email,
        req.body.password
    );

    return response.sendResponse(res, result);
});

module.exports = usersController;
