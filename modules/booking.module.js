const Joi = require("joi");
const prisma = require("../helpers/database");
const fs = require("fs");

class _booking {
    addBooking = async (body, files) => {
        try {
            const schema = Joi.object({
                id_fasilitas: Joi.number().required(),
                id_harga: Joi.number().required(),
                id_account: Joi.number().required(),
                tanggal_pemesanan: Joi.date().required(),
                jam_checkin: Joi.string().required(),
                jam_checkout: Joi.string().required(),
                durasi: Joi.number().required(),
                total_harga: Joi.number().required(),
                status: Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const Booking = await prisma.pemesanan.create({
                data: {
                    id_harga: body.id_harga,
                    id_account: body.id_account,
                    tanggal_pemesanan: new Date(body.tanggal_pemesanan),
                    jam_checkin: body.jam_checkin,
                    jam_checkout: body.jam_checkout,
                    durasi: body.durasi,
                    total_harga: body.total_harga,
                    status: body.status,
                    id_fasilitas: body.id_fasilitas,
                },
            });

            if (Booking) {
                return {
                    status: true,
                    code: 201,
                    message: "Add Fasilitas success",
                    data: Booking,
                };
            }
        } catch (error) {
            console.error("add fasilitas module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getBooking = async () => {
        try {
            const Booking = await prisma.pemesanan.findMany({
                include: {
                    Account: {
                        include: {
                            Mahasiswa: {
                                select: {
                                    nama: true,
                                },
                            },
                            Dosen: {
                                select: {
                                    nama: true,
                                },
                            },
                            Umum: {
                                select: {
                                    nama: true,
                                },
                            },
                        },
                    },
                    Fasilitas: {
                        select: {
                            nama: true,
                        },
                    },
                },
            });

            if (Booking) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Fasilitas success",
                    data: Booking,
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

    getBookingById = async (id) => {
        try {
            const Booking = await prisma.pemesanan.findUnique({
                where: {
                    id_pemesanan: Number(id),
                },
                include: {
                    Account: {
                        include: {
                            Mahasiswa: {
                                select: {
                                    nama: true,
                                },
                            },
                            Dosen: {
                                select: {
                                    nama: true,
                                },
                            },
                            Umum: {
                                select: {
                                    nama: true,
                                },
                            },
                        },
                    },
                    Harga: {
                        select: {
                            harga: true,
                        },
                    },
                    Fasilitas: {
                        select: {
                            nama: true,
                        },
                    },
                },
            });

            if (Booking) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Pemesanan success",
                    data: Booking,
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

    getBookingByIdFasilitas = async (id) => {
        try {
            const Booking = await prisma.pemesanan.findMany({
                where: {
                    id_fasilitas: Number(id),
                },
            });

            if (Booking) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Pemesanan success",
                    data: Booking,
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

    updateBooking = async (body, files) => {};

    deleteBooking = async (id) => {
        try {
            const Booking = await prisma.pemesanan.delete({
                where: {
                    id_pemesanan: Number(id),
                },
            });

            if (Booking) {
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

    uploadBukti = async (id, file) => {
        try {
            const Booking = await prisma.pemesanan.update({
                where: {
                    id_pemesanan: Number(id),
                },
                data: {
                    bukti_pembayaran: file.filename,
                    status: "Menunggu Konfirmasi",
                },
            });

            if (Booking) {
                return {
                    status: true,
                    code: 200,
                    message: "Upload Bukti Pembayaran success",
                };
            }
        } catch (error) {
            console.error("upload bukti pembayaran module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getBookingByIdUser = async (id) => {
        try {
            const Booking = await prisma.pemesanan.findMany({
                where: {
                    id_account: Number(id),
                },
                include: {
                    Fasilitas: {
                        select: {
                            nama: true,
                        },
                    },
                },
            });

            if (Booking) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Pemesanan success",
                    data: Booking,
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

    updateStatus = async (id, status) => {
        try {
            const Booking = await prisma.pemesanan.update({
                where: {
                    id_pemesanan: Number(id),
                },
                data: {
                    status: status,
                },
            });

            if (Booking) {
                return {
                    status: true,
                    code: 200,
                    message: "Update Status success",
                };
            }
        } catch (error) {
            console.error("update status module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };
}

module.exports = new _booking();
