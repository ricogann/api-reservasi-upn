const prisma = require("../helpers/database");
const fs = require("fs");

class _misc {
    async getMisc() {
        try {
            const misc = await prisma.misc.findFirst();

            if (misc) {
                return {
                    status: true,
                    code: 200,
                    message: "Get misc success",
                    data: misc,
                };
            }
        } catch (error) {
            console.error("get misc module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    }

    async updateMisc(id, body, files) {
        try {
            if (files.logo_instansi) {
                fs.unlinkSync(`./public/${body.logo_instansi_old}`);
                body.logo_instansi = files.logo_instansi[0].filename;
            }

            if (files.tanda_tangan) {
                fs.unlinkSync(`./public/${body.tanda_tangan_old}`);
                body.tanda_tangan = files.tanda_tangan[0].filename;
            }

            if (files.terms_service) {
                fs.unlinkSync(`./public/${body.terms_service_old}`);
                body.tanda_tangan = files.terms_service[0].filename;
            }

            const misc = await prisma.misc.update({
                where: {
                    id_misc: Number(id),
                },
                data: {
                    nama_instansi: body.nama_instansi,
                    logo_instansi: body.logo_instansi,
                    no_hp: body.no_hp,
                    email: body.email,
                    instagram: body.instagram,
                    laman_web: body.laman_web,
                    nama_pic: body.nama_pic,
                    nip_pic: body.nip_pic,
                    tanda_tangan: body.tanda_tangan,
                    terms_service: body.terms_service,
                },
            });

            if (misc) {
                return {
                    status: true,
                    code: 200,
                    message: "Update misc success",
                    data: misc,
                };
            }
        } catch (error) {
            fs.unlinkSync(`./public/${files.logo_instansi[0].filename}`);
            console.error("update misc module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    }
}

module.exports = new _misc();
