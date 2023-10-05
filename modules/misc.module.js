const prisma = require("../helpers/database");

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

    async updateMisc(id, body) {
        try {
            const misc = await prisma.misc.update({
                where: {
                    id: Number(id),
                },
                data: {
                    ...body,
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
        } catch {
            console.error("update misc module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    }
}

module.exports = new _misc();
