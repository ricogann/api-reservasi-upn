const Joi = require("joi");
const prisma = require("../helpers/database");
const fs = require("fs");

class _harga {
    addHarga = async (body, files) => {
        try {
            const schema = Joi.object({
                nama: Joi.string().required(),
                alamat: Joi.string().required(),
                deskripsi: Joi.string().required(),
                buka_hari: Joi.string().required(),
                jam_buka: Joi.string().required(),
                jam_tutup: Joi.string().required(),
                durasi: Joi.number().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                files.map((file) => {
                    fs.unlinkSync(`./public/${file.filename}`);
                });

                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const foto = files.map((file) => file.filename);

            const Harga = await prisma.harga.create({
                data: {
                    nama: body.nama,
                    alamat: body.alamat,
                    deskripsi: body.deskripsi,
                    foto: JSON.stringify(foto),
                    buka_hari: body.buka_hari,
                    jam_buka: body.jam_buka,
                    jam_tutup: body.jam_tutup,
                    durasi: Number(body.durasi),
                },
            });

            console.log(harga);

            if (harga) {
                return {
                    status: true,
                    code: 201,
                    message: "Add Harga success",
                };
            }
        } catch (error) {
            files.map((file) => {
                fs.unlinkSync(`./public/${file.filename}`);
            });
            console.error("add Harga module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getHarga = async () => {
        try {
            const Harga = await prisma.harga.findMany({});

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
            const Harga = await prisma.harga.findUnique({
                where: {
                    id_harga: Number(id),
                },
            });

            if (harga) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Harga success",
                    data: harga,
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
                    id_harga: Number(id),
                },
            });

            if (harga) {
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
