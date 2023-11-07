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
                //termservice : Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);
            // const termserviceFile = files.find((file) => file.fieldname === 'termservice');

            if (validation.error) {
                files.map((file) => {
                    fs.unlinkSync(`./public/${file.filename}`);
                });

                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const foto = files.foto.map((file) => file.filename);
            const termservice = files.termservice
                ? files.termservice[0].filename
                : null;

            // const foto = files
            // .filter((file) => file.fieldname === 'foto')
            // .map((file) => file.filename);

            // const termservice = files
            // .filter((file) => file.fieldname === 'termservice')
            // .map((file) => file.filename);

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
                    termservice: termservice
                        ? JSON.stringify(termservice)
                        : null,
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
            if (files.foto.length > 0 || files.termservice.length > 0) {
                const foto = files.foto.map((file) => file.filename);
                const termservice = files.termservice
                    ? files.termservice[0].filename
                    : null;
                const old_foto = JSON.parse(body.name_foto_old);
                const old_termservice = JSON.parse(body.name_termservice_old);
                console.log(old_termservice);
                // old_foto.map((foto) => {
                //     fs.unlinkSync(`./public/${foto}`);
                // });
                // fs.unlinkSync(`./public/${old_termservice}`);
                console.log(foto);
                console.log(termservice);

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
                        termservice: JSON.stringify(termservice),
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
            // files.map((file) => {
            //     fs.unlinkSync(`./public/${file.filename}`);
            // });
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
