const m$users = require("../modules/users.module");
const response = require("../helpers/response");

const { Router } = require("express");

const usersController = Router();

usersController.get("/account", async (req, res) => {
    const result = await m$users.getAccount();

    return response.sendResponse(res, result);
});

usersController.get("/umum", async (req, res) => {
    const result = await m$users.getUmum();

    return response.sendResponse(res, result);
});

usersController.get("/mahasiswa", async (req, res) => {
    const result = await m$users.getMahasiswa();

    return response.sendResponse(res, result);
});

usersController.get("/dosen", async (req, res) => {
    const result = await m$users.getDosen();

    return response.sendResponse(res, result);
});

usersController.get("/account/:id", async (req, res) => {
    const result = await m$users.getAccountById(req.params.id);

    return response.sendResponse(res, result);
});

usersController.put("/account/updateStatus/:id", async (req, res) => {
    const result = await m$users.updateStatus(req.params.id, req.body);

    return response.sendResponse(res, result);
});

usersController.put("/mahasiswa/updateStatus/:id", async (req, res) => {
    const result = await m$users.updateStatusMahasiswa(req.params.id, req.body);

    return response.sendResponse(res, result);
});

usersController.delete("/account/delete/:id", async (req, res) => {
    const result = await m$users.deleteAccount(req.params.id);

    return response.sendResponse(res, result);
});

usersController.delete("/mahasiswa/delete/:id", async (req, res) => {
    const result = await m$users.deleteMahasiswa(req.params.id);

    return response.sendResponse(res, result);
});

module.exports = usersController;
