const Joi = require("joi");
const prisma = require("../helpers/database");
const fs = require("fs");

class _harga {
    addHarga = async (body) => {
        try {
            const Harga = await prisma.harga.create({
                data: {
                    nama: body.nama,
                    id_fasilitas: Number(body.id_fasilitas),
                    harga: Number(body.harga),
                },
            });

            if (Harga) {
                return {
                    status: true,
                    code: 201,
                    message: "Add Harga success",
                };
            }
        } catch (error) {
            console.error("add Harga module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getHarga = async () => {
        try {
            const Harga = await prisma.harga.findMany({
                include: {
                    Fasilitas: true,
                },
            });

            if (Harga) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Harga success",
                    data: Harga,
                };
            }
        } catch (error) {
            console.error("get Harga module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    gethargaById = async (id) => {
        try {
            const Harga = await prisma.harga.findFirst({
                where: {
                    id: Number(id),
                },
                include: {
                    Fasilitas: true,
                },
            });

            if (Harga) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Harga success",
                    data: Harga,
                };
            }
        } catch (error) {
            console.error("get Harga module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    updateHarga = async (body, files) => {};

    deleteHarga = async (id) => {
        try {
            const Harga = await prisma.harga.delete({
                where: {
                    id: Number(id),
                },
            });

            if (Harga) {
                return {
                    status: true,
                    code: 200,
                    message: "Delete Harga success",
                };
            }
        } catch (error) {
            console.error("delete Harga module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };
}

module.exports = new _harga();
