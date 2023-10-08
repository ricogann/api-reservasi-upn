const Joi = require("joi");
const prisma = require("../helpers/database");

class _kamar {
    addKamar = async (body) => {
        try {
            const schema = Joi.object({
                no_kamar: Joi.number().required(),
                lantai: Joi.number().required(),
                status_kamar: Joi.boolean().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const lantai = await prisma.lantai_asrama.findFirst({
                where: {
                    lantai: body.lantai,
                },
            });

            // Check if no_kamar already exists in the database
            const existingKamar = await prisma.kamar_asrama.findFirst({
                where: {
                    no_kamar: body.no_kamar,
                },
            });

            if (existingKamar) {
                return {
                    status: false,
                    code: 400, // You can choose an appropriate HTTP status code
                    message: "Kamar with this no_kamar already exists",
                };
            }

            const kamar = await prisma.kamar_asrama.create({
                data: {
                    no_kamar: body.no_kamar,
                    id_lantai: lantai.id_lantai,
                    status_kamar: body.status_kamar,
                },
            });

            if (kamar) {
                return {
                    status: true,
                    code: 201,
                    message: "Add Kamar success",
                };
            }
        } catch (error) {
            console.error("add kamar module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getKamar = async () => {
        try {
            const kamar = await prisma.kamar_asrama.findMany({
                include: {
                    Harga: true,
                },
            });

            if (kamar) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Kamar success",
                    data: kamar,
                };
            }
        } catch (error) {
            console.error("get kamar module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getKamarById = async (id) => {
        try {
            const kamar = await prisma.kamar_asrama.findUnique({
                where: {
                    id_asrama: Number(id),
                },
            });

            if (kamar) {
                return {
                    status: true,
                    code: 200,
                    message: "Get kamar success",
                    data: kamar,
                };
            }
        } catch (error) {
            console.error("get kamar module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    updateKamar = async (id, body) => {
        try {
            const schema = Joi.object({
                no_kamar: Joi.number().required(),
                id_lantai: Joi.number().required(),
                npm_bed1_a: Joi.string().allow(null),
                npm_bed2_b: Joi.string().allow(null),
                npm_bed3_3: Joi.string().allow(null),
                status_kamar: Joi.boolean().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const kamar = await prisma.kamar_asrama.update({
                where: {
                    id_asrama: Number(id),
                },
                data: {
                    no_kamar: body.no_kamar,
                    id_lantai: Number(body.id_lantai),
                    npm_bed1_a: body.npm_bed1_a,
                    npm_bed2_b: body.npm_bed2_b,
                    npm_bed3_3: body.npm_bed3_3,
                    status_kamar: Boolean(body.status_kamar),
                },
            });

            if (kamar) {
                return {
                    status: true,
                    code: 200,
                    message: "Update Kamar success",
                };
            }
        } catch (error) {
            console.error("update kamar module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    deleteKamar = async (id) => {
        try {
            const kamar = await prisma.kamar_asrama.delete({
                where: {
                    id_asrama: Number(id),
                },
            });

            if (kamar) {
                return {
                    status: true,
                    code: 200,
                    message: "Delete Kamar success",
                };
            }
        } catch (error) {
            console.error("delete kamar module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    deleteExpiredMahasiswa = async (id) => {
        try {
            const mahasiswa = await prisma.mahasiswa.findFirst({
                where: {
                    id_account: Number(id),
                },
            });

            const kamar = await prisma.kamar_asrama.findMany();

            const kamar1 = kamar.filter(
                (kamar) => kamar.npm_bed1_a === mahasiswa.npm
            );

            const kamar2 = kamar.filter(
                (kamar) => kamar.npm_bed2_b === mahasiswa.npm
            );

            const kamar3 = kamar.filter(
                (kamar) => kamar.npm_bed3_3 === mahasiswa.npm
            );

            if (kamar1.length > 0) {
                const kamar = await prisma.kamar_asrama.update({
                    where: {
                        id_asrama: kamar1[0].id_asrama,
                    },
                    data: {
                        npm_bed1_a: null,
                        status_kamar: true,
                    },
                });
            }

            if (kamar2.length > 0) {
                const kamar = await prisma.kamar_asrama.update({
                    where: {
                        id_asrama: kamar2[0].id_asrama,
                    },
                    data: {
                        npm_bed2_b: null,
                        status_kamar: true,
                    },
                });
            }

            if (kamar3.length > 0) {
                const kamar = await prisma.kamar_asrama.update({
                    where: {
                        id_asrama: kamar3[0].id_asrama,
                    },
                    data: {
                        npm_bed3_3: null,
                        status_kamar: true,
                    },
                });
            }

            return {
                status: true,
                code: 200,
                message: "Delete Mahasiswa success",
            };
        } catch (error) {
            console.error("delete mahasiswa in kamar module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };
}

module.exports = new _kamar();
