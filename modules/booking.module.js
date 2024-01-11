const Joi = require("joi");
const prisma = require("../helpers/database");
const fs = require("fs");
const main = require("../socket");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

class _booking {
    addBooking = async (body, files) => {
        try {
            const schema = Joi.object({
                id_fasilitas: Joi.number().required(),
                id_harga: Joi.number(),
                id_account: Joi.number().required(),
                tanggal_pemesanan: Joi.date(),
                jam_checkin: Joi.string().required(),
                jam_checkout: Joi.string().required(),
                durasi: Joi.number(),
                total_harga: Joi.number(),
                status: Joi.string().required(),
                keterangan: Joi.string().required(),
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
                    keterangan: body.keterangan,
                    status: body.status,
                    id_fasilitas: body.id_fasilitas,
                },
            });

            if (Booking) {
                const token = process.env.TOKEN_TELEGRAM;
                const chatId = process.env.CHAT_ID;
                const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=Ada Pemesanan Baru%0A%0AID Pemesanan: ${Booking.id_pemesanan}%0AID Fasilitas: ${Booking.id_fasilitas}%0AID Account: ${Booking.id_account}%0ATanggal Pemesanan: ${Booking.tanggal_pemesanan}%0AJam Checkin: ${Booking.jam_checkin}%0AJam Checkout: ${Booking.jam_checkout}%0ADurasi: ${Booking.durasi}%0ATotal Harga: ${Booking.total_harga}%0AKeterangan: ${Booking.keterangan}%0AStatus: ${Booking.status}`;

                return {
                    status: true,
                    code: 201,
                    message: "create pemesanan success",
                    data: Booking,
                };
            }
        } catch (error) {
            console.error("create pemesanan module Error: ", error);
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
                            UKM: {
                                select: {
                                    nama_ukm: true,
                                },
                            },
                            Organisasi: {
                                select: {
                                    nama_organisasi: true,
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
			    no_va: true,
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

    deleteBookingCronJob = async () => {
        try {
            const currentDate = new Date(Date.now() - 86400000); // Tanggal Kemarin
            const Booking = await prisma.pemesanan.deleteMany({
                where: {
                    status: "Menunggu Pembayaran",
                    createdAt: {
                        lt: currentDate,
                    },
                },
            });
            console.log(currentDate);

            if (Booking) {
                return {
                    status: true,
                    code: 200,
                    message: "Delete CronJob Booking success",
                };
            }
        } catch (error) {
            console.error("delete Booking Cronjob module Error: ", error);
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
                    status: "Review Berkas",
                },
            });

            if (Booking) {
                const token = process.env.TOKEN_TELEGRAM;
                const chatId = process.env.CHAT_ID;
                const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=Ada yang baru saja upload Bukti Pembayaran!%0A%0AID Pemesanan: ${Booking.id_pemesanan}%0AID Fasilitas: ${Booking.id_fasilitas}%0AID Account: ${Booking.id_account}%0ATanggal Pemesanan: ${Booking.tanggal_pemesanan}%0AJam Checkin: ${Booking.jam_checkin}%0AJam Checkout: ${Booking.jam_checkout}%0ADurasi: ${Booking.durasi}%0ATotal Harga: ${Booking.total_harga}%0AKeterangan: ${Booking.keterangan}%0AStatus: ${Booking.status}`;

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

    uploadSIK = async (id, file) => {
        try {
            const Booking = await prisma.pemesanan.update({
                where: {
                    id_pemesanan: Number(id),
                },
                data: {
                    SIK: file.filename,
                    status: "Review Berkas",
                },
            });

            if (Booking) {
                const token = process.env.TOKEN_TELEGRAM;
                const chatId = process.env.CHAT_ID;
                const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=Ada yang baru saja upload SIK!%0A%0AID Pemesanan: ${Booking.id_pemesanan}%0AID Fasilitas: ${Booking.id_fasilitas}%0AID Account: ${Booking.id_account}%0ATanggal Pemesanan: ${Booking.tanggal_pemesanan}%0AJam Checkin: ${Booking.jam_checkin}%0AJam Checkout: ${Booking.jam_checkout}%0ADurasi: ${Booking.durasi}%0ATotal Harga: ${Booking.total_harga}%0AKeterangan: ${Booking.keterangan}%0AStatus: ${Booking.status}`;

                return {
                    status: true,
                    code: 200,
                    message: "Upload SIK success",
                };
            }
        } catch (error) {
            console.error("upload SIK module Error: ", error);
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
			    no_va: true,
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

    updateStatus = async (id, body) => {
        try {
            let keterangan_tolak = null;
            if (body.keterangan_tolak) {
                keterangan_tolak = body.keterangan_tolak;
            }
            const Booking = await prisma.pemesanan.update({
                where: {
                    id_pemesanan: Number(id),
                },
                data: {
                    status: body.status,
                    keterangan_tolak: keterangan_tolak,
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

    addMahasiswaToKamar = async (id, body) => {
        try {
            const kamar = await prisma.kamar_asrama.findMany();

            const mahasiswa = await prisma.mahasiswa.findFirst({
                where: {
                    id_account: Number(body.idAccount),
                },
            });

            console.log(mahasiswa);

            for (const item of kamar) {
                if (item.npm_bed1_a === mahasiswa.npm) {
                    return {
                        status: false,
                        message: "Mahasiswa Sudah Ada",
                    };
                } else if (item.npm_bed2_b === mahasiswa.npm) {
                    return {
                        status: false,
                        message: "Mahasiswa Sudah Ada",
                    };
                } else if (item.npm_bed3_c === mahasiswa.npm) {
                    return {
                        status: false,
                        message: "Mahasiswa Sudah Ada",
                    };
                }
            }

            for (const item of kamar) {
                if (item.npm_bed1_a === null) {
                    const addMahasiswa = await prisma.kamar_asrama.update({
                        where: {
                            id_asrama: item.id_asrama,
                        },
                        data: {
                            npm_bed1_a: mahasiswa.npm,
                        },
                    });

                    break;
                } else if (item.npm_bed2_b === null) {
                    const addMahasiswa = await prisma.kamar_asrama.update({
                        where: {
                            id_asrama: item.id_asrama,
                        },
                        data: {
                            npm_bed2_b: mahasiswa.npm,
                        },
                    });

                    break;
                } else if (item.npm_bed3_c === null) {
                    const addMahasiswa = await prisma.kamar_asrama.update({
                        where: {
                            id_asrama: item.id_asrama,
                        },
                        data: {
                            npm_bed3_c: mahasiswa.npm,
                        },
                    });

                    const updateStatusKamar = await prisma.kamar_asrama.update({
                        where: {
                            id_asrama: item.id_asrama,
                        },
                        data: {
                            status_kamar: false,
                        },
                    });

                    break;
                }
            }

            return {
                status: true,
                code: 200,
                message: "add mahasiswa to kamar success",
            };
        } catch (error) {
            console.error("add mahasiswa to kamar module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };
}

module.exports = new _booking();
