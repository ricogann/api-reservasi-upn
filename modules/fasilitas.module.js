const Joi = require("joi");
const prisma = require("../helpers/database");
const fs = require("fs");

class _fasilitas {
    addFasilitas = async (body, files) => {
        try {
            const schema = Joi.object({
                nama: Joi.string().required(),
                alamat: Joi.string().required(),
                deskripsi: Joi.string().required(),
                buka_hari: Joi.string().required(),
                jam_buka: Joi.string().required(),
                jam_tutup: Joi.string().required(),
                durasi: Joi.number().required(),
                no_va: Joi.string().required(),
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

            console.log(body);

            const fasilitas = await prisma.fasilitas.create({
                data: {
                    nama: body.nama,
                    alamat: body.alamat,
                    deskripsi: body.deskripsi,
                    foto: JSON.stringify(foto),
                    buka_hari: body.buka_hari,
                    jam_buka: body.jam_buka,
                    jam_tutup: body.jam_tutup,
                    durasi: Number(body.durasi),
                    no_va: body.no_va,
                },
            });

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
            const fasilitas = await prisma.fasilitas.findMany({});

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

    updateFasilitas = async (id, body, files) => {
        try {
            if (files.length > 0) {
                console.log(files);
                const foto = files.map((file) => file.filename);
                // const old_foto = JSON.parse(body.name_foto_old);
                // old_foto.map((foto) => {
                //     fs.unlinkSync(`./public/${foto}`);
                // });

                const fasilitas = await prisma.fasilitas.update({
                    where: {
                        id_fasilitas: Number(id),
                    },
                    data: {
                        nama: body.nama,
                        alamat: body.alamat,
                        deskripsi: body.deskripsi,
                        foto: JSON.stringify(foto),
                        buka_hari: body.buka_hari,
                        jam_buka: body.jam_buka,
                        jam_tutup: body.jam_tutup,
                        durasi: 1,
                        no_va: body.no_va,
                    },
                });
                if (fasilitas) {
                    return {
                        status: true,
                        code: 200,
                        message: "Update Fasilitas success",
                    };
                }
            } else {
                const fasilitas = await prisma.fasilitas.update({
                    where: {
                        id_fasilitas: Number(id),
                    },
                    data: {
                        nama: body.nama,
                        alamat: body.alamat,
                        deskripsi: body.deskripsi,
                        buka_hari: body.buka_hari,
                        jam_buka: body.jam_buka,
                        jam_tutup: body.jam_tutup,
                        durasi: 1,
                        no_va: body.no_va,
                    },
                });
                if (fasilitas) {
                    return {
                        status: true,
                        code: 200,
                        message: "Update Fasilitas success",
                    };
                }
            }
        } catch (error) {
            files.map((file) => {
                fs.unlinkSync(`./public/${file.filename}`);
            });
            console.error("update fasilitas module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

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
