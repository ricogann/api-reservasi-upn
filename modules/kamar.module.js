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

    getHistoryKamar = async () => {
        try {
            const kamar = await prisma.history_kamar_asrama.findMany();
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
            const kamar = await prisma.kamar_asrama.update({
                where: {
                    id_asrama: Number(id),
                },
                data: {
                    npm_bed1_a: body.npm_bed1_a,
                    npm_bed2_b: body.npm_bed2_b,
                    npm_bed3_c: body.npm_bed3_c,
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

    deleteExpiredMahasiswaCronJob = async () => {
        try {
            const year = new Date().getFullYear().toString().split("");
            const npm = year[2] + year[3] - 1 + "081010001";

            const kamar1 = await prisma.kamar_asrama.updateMany({
                where: {
                    npm_bed1_a: {
                        lt: npm,
                    },
                },
                data: {
                    npm_bed1_a: null,
                },
            });

            const kamar2 = await prisma.kamar_asrama.updateMany({
                where: {
                    npm_bed2_b: {
                        lt: npm,
                    },
                },
                data: {
                    npm_bed2_b: null,
                },
            });

            const kamar3 = await prisma.kamar_asrama.updateMany({
                where: {
                    npm_bed3_c: {
                        lt: npm,
                    },
                },
                data: {
                    npm_bed3_c: null,
                },
            });

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

    July25ChangeStatusKamarCronJob = async () => {
        try {
            const oneYearBefore = new Date().getFullYear() - 1; // Get the current year

            const kamar = await prisma.kamar_asrama.findMany({
                include: {
                    Harga: true,
                },
            });

            // Iterate through the kamar array and insert each item into history_kamar_asrama
            for (const kamarItem of kamar) {
                await prisma.history_kamar_asrama.create({
                    data: {
                        id_asrama: kamarItem.id_asrama,
                        no_kamar: kamarItem.no_kamar,
                        npm_bed1_a: kamarItem.npm_bed1_a,
                        npm_bed2_b: kamarItem.npm_bed2_b,
                        npm_bed3_c: kamarItem.npm_bed3_c,
                        year: oneYearBefore, // Set the year to the current year
                    },
                });
            }

            const kamar1 = await prisma.kamar_asrama.updateMany({
                data: {
                    npm_bed1_a: null,
                },
            });

            const kamar2 = await prisma.kamar_asrama.updateMany({
                data: {
                    npm_bed2_b: null,
                },
            });

            const kamar3 = await prisma.kamar_asrama.updateMany({
                data: {
                    npm_bed3_c: null,
                },
            });

            return {
                status: true,
                code: 200,
                message: "Change Status Kamar success",
            };
        } catch (error) {
            console.error("Change Status kamar module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };
}

module.exports = new _kamar();
