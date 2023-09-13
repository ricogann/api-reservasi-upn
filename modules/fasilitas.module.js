const Joi = require("joi");
const prisma = require("../helpers/database");
const fs = require("fs");

class _fasilitas {
    addFasilitas = async (body, files) => {
        try {
            const schema = Joi.object({
                nama_fasilitas: Joi.string().required(),
                alamat_fasilitas: Joi.string().required(),
                deskripsi_fasilitas: Joi.string().required(),
                biaya_fasilitas: Joi.number().required(),
                status_fasilitas: Joi.string().required(),
                id_jenis_fasilitas: Joi.string().required(),
                jam_masuk: Joi.string().required(),
                jam_keluar: Joi.string().required(),
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

            const foto_fasilitas = files.map((file) => file.filename);

            const fasilitas = await prisma.fasilitas.create({
                data: {
                    nama_fasilitas: body.nama_fasilitas,
                    alamat_fasilitas: body.alamat_fasilitas,
                    deskripsi_fasilitas: body.deskripsi_fasilitas,
                    biaya_fasilitas: Number(body.biaya_fasilitas),
                    foto_fasilitas: JSON.stringify(foto_fasilitas),
                    status_fasilitas: Boolean(body.status_fasilitas),
                    id_jenis_fasilitas: Number(body.id_jenis_fasilitas),
                    jam_masuk: body.jam_masuk,
                    jam_keluar: body.jam_keluar,
                },
            });

            console.log(fasilitas);

            if (fasilitas) {
                return {
                    status: true,
                    code: 201,
                    message: "Add Fasilitas success",
                };
            }
        } catch (error) {
            files.map((file) => {
                fs.unlinkSync(`./public/${file.filename}`);
            });
            console.error("add fasilitas module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getFasilitas = async () => {
        try {
            const fasilitas = await prisma.fasilitas.findMany({
                include: {
                    jenis_fasilitas: true,
                },
            });

            if (fasilitas) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Fasilitas success",
                    data: fasilitas,
                };
            }
        } catch (error) {
            console.error("get fasilitas module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getFasilitasById = async (id) => {
        try {
            const fasilitas = await prisma.fasilitas.findUnique({
                where: {
                    id_fasilitas: Number(id),
                },
                include: {
                    jenis_fasilitas: true,
                },
            });

            if (fasilitas) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Fasilitas success",
                    data: fasilitas,
                };
            }
        } catch (error) {
            console.error("get fasilitas module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    updateFasilitas = async (body, files) => {};

    deleteFasilitas = async (id) => {
        try {
            const fasilitas = await prisma.fasilitas.delete({
                where: {
                    id_fasilitas: Number(id),
                },
            });

            if (fasilitas) {
                return {
                    status: true,
                    code: 200,
                    message: "Delete Fasilitas success",
                };
            }
        } catch (error) {
            console.error("delete fasilitas module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };
}

module.exports = new _fasilitas();
