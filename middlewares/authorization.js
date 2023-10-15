const jwt = require("jsonwebtoken");
const prisma = require("../helpers/database");

authorization = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, "jwt-secret-code");

            const auth = await prisma.account.findUnique({
                where: {
                    id_account: decoded.id_account,
                },
            });

            if (auth) {
                req.auth = {
                    id_account: decoded.id_account,
                    id_role: auth.id_role, // Mengasumsikan peran disimpan dalam objek "auth"
                };

                // Periksa peran pengguna dan izinkan atau tolak akses berdasarkan itu
                if (checkRoleAccess(req, res, next)) {
                    console.log(error);
                } else {
                    res.status(403).json({
                        status: false,
                        error: "Akses ditolak. Izin tidak mencukupi.",
                    });
                }
            } else {
                res.status(401).json({
                    status: false,
                    error: "Tidak diotorisasi",
                });
            }
        } catch (error) {
            console.log("error middleware otentikasi: ", error);
            res.status(401).json({
                status: false,
                error: "Tidak diotorisasi",
            });
        }
    }

    if (!token) {
        res.status(401).json({
            status: false,
            error: "Tidak diotorisasi",
        });
    }
};

// Fungsi untuk memeriksa akses berdasarkan peran
function checkRoleAccess(req, res, next) {
    const { id_role } = req.auth;
    console.log(req);
    // Tentukan ID peran dan izin yang sesuai
    const rolePermissions = {
        1: ["write", "read", "edit"], // Mengasumsikan 1 adalah ID peran untuk 'Dosen'
        2: ["write", "read", "edit"], // Mengasumsikan 2 adalah ID peran untuk 'Mahasiswa'
        3: ["write", "read", "edit"], // Mengasumsikan 3 adalah ID peran untuk 'Umum'
        // Tentukan ID peran lainnya dan izin mereka sesuai kebutuhan
    };

    const requiredPermissions = rolePermissions[id_role];

    if (requiredPermissions) {
        const { method } = req; // Mengasumsikan Anda menggunakan Express.js atau kerangka kerja serupa

        if (requiredPermissions.includes(method)) {
            return true; // Pengguna memiliki izin yang diperlukan
        }
    }

    return false; // Pengguna tidak memiliki izin yang diperlukan
}

module.exports = authorization;
