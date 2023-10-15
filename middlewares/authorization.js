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

            const authAdmin = await prisma.admin.findUnique({
                where: {
                    id_admin: decoded.id_admin,
                },
            });

            console.log(authAdmin);

            if (auth) {
                req.auth = {
                    id_account: decoded.id_account,
                    id_role: auth.id_role,
                    nama: decoded.nama,
                    status: decoded.status,
                };
                next();
            } else if (authAdmin) {
                req.auth = {
                    id_admin: decoded.id_admin,
                    username_admin: decoded.username_admin,
                };
                next();
            } else {
                res.status(401).json({
                    status: false,
                    error: "Unauthorized",
                });
            }
        } catch (error) {
            console.log("error middleware otentikasi: ", error);
            res.status(401).json({
                status: false,
                error: "Unauthorized",
            });
        }
    }

    if (!token) {
        res.status(401).json({
            status: false,
            error: "Unauthorized",
        });
    }
};

module.exports = authorization;
