const prisma = require("../helpers/database");

class _harga {
    getHargaById = async (id) => {
        try {
            const harga = await prisma.harga.findMany({
                where: {
                    id_fasilitas: Number(id),
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
            console.error("get harga module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };
}

module.exports = new _harga();
