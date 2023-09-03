const jwt = require("jsonwebtoken");
const prisma = require("../helpers/database");

auth = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, "jwt-secret-code");

            const auth = await prisma.member.findUnique({
                where: {
                    id_member: decoded.id_member,
                },
            });

            if (auth) {
                req.auth = {
                    id_member: decoded.id_member,
                    email_member: decoded.email_member,
                    name_member: decoded.name_member,
                };
                next();
            } else {
                res.status(401).json({
                    status: false,
                    error: "Unauthorized",
                });
            }
        } catch (error) {
            console.log("auth middleware error: ", error);
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

module.exports = auth;
