const Joi = require("joi");
const prisma = require("../helpers/database");
const fs = require("fs");

class _booking {
    addBooking = async (body, files) => {
        try {
            const schema = Joi.object({
                id_fasilitas : Joi.number().required(),
                id_harga : Joi.number().required(),
                id_account : Joi.string().required(),
                bukti_pembayaran : Joi.string().required(),
                tanggal_pemesanan : Joi.string().required(),
                jam_checkin: Joi.string().required(),
                jam_checkout : Joi.string().required(),
                durasi : Joi.number().required(),
                total_harga : Joi.number().required(),
                status : Joi.string().required(),
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

            const bukti_pembayaran = files.map((file) => file.filename);

            const Booking = await prisma.pemesanan.create({
                data: {
                    id_fasilitas: body.id_fasilitas,
                    id_harga: body.id_harga,
                    id_account: body.id_account,
                    bukti_pembayaran: JSON.stringify(bukti_pembayaran),
                    tanggal_pemesanan: body.tanggal_pemesanan,
                    jam_checkin: body.jam_checkin,
                    jam_checkout: body.jam_checkout,
                    durasi: body.durasi,
                    total_harga: body.total_harga,
                    status: body.status,
                },
            });

            console.log(Booking);

            if (Booking) {
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

    getBooking = async () => {
        try {
            const Booking = await prisma.pemesanan.findMany({
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
}

module.exports = new _booking();
