const Joi = require("joi");
const prisma = require("../helpers/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

class _auth {
    loginMahasiswa = async (body) => {
        try {
            const schema = Joi.object({
                npm: Joi.string().required(),
                password: Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const checkNpm = await prisma.mahasiswa.findUnique({
                where: {
                    npm: body.npm,
                },
                include: {
                    Account: {
                        select: {
                            Role: true,
                            status_account: true,
                        },
                    },
                },
            });

            if (!checkNpm) {
                return {
                    status: false,
                    error: "NPM not registered",
                };
            }

            const checkPassword = bcrypt.compareSync(
                body.password,
                checkNpm.password
            );

            if (!checkPassword) {
                return {
                    status: false,
                    error: "Wrong password",
                };
            }

            const payload = {
                id_account: checkNpm.id_account,
                npm: checkNpm.npm,
                nama: checkNpm.nama,
                no_telp: checkNpm.no_telp,
                role: checkNpm.Account.Role.nama_role,
                status: checkNpm.Account.status_account,
            };

            const token = jwt.sign(payload, "jwt-secret-code", {
                expiresIn: "1d",
            });

            return {
                status: true,
                data: {
                    message: "Login success, here's your token",
                    token: token,
                },
            };
        } catch (error) {
            console.error("login auth module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    loginUmum = async (body) => {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const checkEmail = await prisma.umum.findUnique({
                where: {
                    email: body.email,
                },
                include: {
                    Account: {
                        select: {
                            Role: true,
                            status_account: true,
                        },
                    },
                },
            });

            if (!checkEmail) {
                return {
                    status: false,
                    error: "Email not registered",
                };
            }

            const checkPassword = bcrypt.compareSync(
                body.password,
                checkEmail.password
            );

            if (!checkPassword) {
                return {
                    status: false,
                    error: "Wrong password",
                };
            }

            const payload = {
                id_account: checkEmail.id_account,
                email: checkEmail.email,
                nama: checkEmail.nama,
                no_telp: checkEmail.no_telp,
                role: checkEmail.Account.Role.nama_role,
                status: checkEmail.Account.status_account,
            };

            const token = jwt.sign(payload, "jwt-secret-code", {
                expiresIn: "1d",
            });

            return {
                status: true,
                data: {
                    message: "Login success, here's your token",
                    token: token,
                },
            };
        } catch (error) {
            console.error("login auth module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    loginDosen = async (body) => {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const checkEmail = await prisma.dosen.findUnique({
                where: {
                    email: body.email,
                },
                include: {
                    Account: {
                        select: {
                            Role: true,
                            status_account: true,
                        },
                    },
                },
            });

            if (!checkEmail) {
                return {
                    status: false,
                    error: "Email not registered",
                };
            }

            const checkPassword = bcrypt.compareSync(
                body.password,
                checkEmail.password
            );

            if (!checkPassword) {
                return {
                    status: false,
                    error: "Wrong password",
                };
            }

            const payload = {
                id_account: checkEmail.id_account,
                email: checkEmail.email,
                nama: checkEmail.nama,
                no_telp: checkEmail.no_telp,
                role: checkEmail.Account.Role.nama_role,
                status: checkEmail.Account.status_account,
            };

            const token = jwt.sign(payload, "jwt-secret-code", {
                expiresIn: "1d",
            });

            return {
                status: true,
                data: {
                    message: "Login success, here's your token",
                    token: token,
                },
            };
        } catch (error) {
            console.error("login auth module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    registerMahasiswa = async (body, file) => {
        try {
            console.log(body, file);
            //check type and not null of the variable
            const schema = Joi.object({
                id_account: Joi.string().required(),
                nama: Joi.string().required(),
                npm: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                id_tahun_ajaran: Joi.string().required(),
                id_fakultas: Joi.string().required(),
                id_prodi: Joi.string().required(),
                no_telp: Joi.string().required(),
                status: Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                fs.unlinkSync(`./public/${file.filename}`);
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const bukti_identitas = file ? file.filename : null;

            //check if npm already registered or not
            const checkNpm = await prisma.mahasiswa.findUnique({
                where: {
                    npm: body.npm,
                },
            });

            if (checkNpm) {
                fs.unlinkSync(`./public/${file.filename}`);
                return {
                    status: false,
                    error: "NPM already registered",
                };
            }

            //hash password
            const hash_password = bcrypt.hashSync(body.password, 10);

            //insert data to database
            const insertData = await prisma.mahasiswa.create({
                data: {
                    id_account: parseInt(body.id_account),
                    nama: body.nama,
                    npm: body.npm,
                    email: body.email,
                    password: hash_password,
                    id_tahun_ajaran: Number(body.id_tahun_ajaran),
                    id_fakultas: Number(body.id_fakultas),
                    id_prodi: Number(body.id_prodi),
                    no_telp: body.no_telp,
                    status: Boolean(body.status),
                    bukti_identitas: bukti_identitas,
                },
            });

            if (insertData) {
                return {
                    status: true,
                    code: 201,
                    message: "Register success",
                };
            }
        } catch (error) {
            if (file) {
                fs.unlinkSync(`./public/${file.filename}`);
            }
            console.error("register auth module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    registerUmum = async (body, file) => {
        try {
            //check type and not null of the variable
            const schema = Joi.object({
                id_account: Joi.string().required(),
                NIK: Joi.string().required(),
                nama: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required(),
                no_telp: Joi.string().required(),
                status: Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                fs.unlinkSync(`./public/${file.filename}`);
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const bukti_identitas = file ? file.filename : null;

            //check if email already registered or not
            const checkEmail = await prisma.umum.findUnique({
                where: {
                    email: body.email,
                },
            });

            if (checkEmail) {
                fs.unlinkSync(`./public/${file.filename}`);
                return {
                    status: false,
                    error: "Email already registered",
                };
            }

            //hash password
            const hash_password = bcrypt.hashSync(body.password, 10);

            //insert data to database

            const insertData = await prisma.umum.create({
                data: {
                    id_account: Number(body.id_account),
                    NIK: body.NIK,
                    nama: body.nama,
                    email: body.email,
                    password: hash_password,
                    no_telp: body.no_telp,
                    role: body.role,
                    status: Boolean(body.status),
                    bukti_identitas: bukti_identitas,
                },
            });

            if (insertData) {
                return {
                    status: true,
                    code: 201,
                    message: "Register success",
                };
            }
        } catch (error) {
            if (file) {
                fs.unlinkSync(`./public/${file.filename}`);
            }
            console.error("register auth module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    registerDosen = async (body, file) => {
        try {
            //check type and not null of the variable
            const schema = Joi.object({
                id_account: Joi.string().required(),
                NIP: Joi.string().required(),
                nama: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required(),
                no_telp: Joi.string().required(),
                status: Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                fs.unlinkSync(`./public/${file.filename}`);
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const bukti_identitas = file ? file.filename : null;

            //check if email already registered or not
            const checkEmail = await prisma.dosen.findUnique({
                where: {
                    email: body.email,
                },
            });

            if (checkEmail) {
                fs.unlinkSync(`./public/${file.filename}`);
                return {
                    status: false,
                    error: "Email already registered",
                };
            }

            //hash password
            const hash_password = bcrypt.hashSync(body.password, 10);

            //insert data to database

            const insertData = await prisma.dosen.create({
                data: {
                    id_account: Number(body.id_account),
                    NIP: body.NIP,
                    nama: body.nama,
                    email: body.email,
                    password: hash_password,
                    no_telp: body.no_telp,
                    role: body.role,
                    status: Boolean(body.status),
                    bukti_identitas: bukti_identitas,
                },
            });

            if (insertData) {
                return {
                    status: true,
                    code: 201,
                    message: "Register success",
                };
            }
        } catch (error) {
            if (file) {
                fs.unlinkSync(`./public/${file.filename}`);
            }
            console.error("register auth module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    loginAdmin = async (body) => {
        try {
            const schema = Joi.object({
                username_admin: Joi.string().required(),
                password_admin: Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const checkUsername = await prisma.admin.findFirst({
                where: {
                    username_admin: body.username_admin,
                },
            });

            if (!checkUsername) {
                return {
                    status: false,
                    error: "Username not registered",
                };
            }

            const checkPassword = bcrypt.compareSync(
                body.password_admin,
                checkUsername.password_admin
            );

            if (!checkPassword) {
                return {
                    status: false,
                    error: "Wrong password",
                };
            }

            const payload = {
                id_admin: checkUsername.id_admin,
                username_admin: checkUsername.username_admin,
            };

            const token = jwt.sign(payload, "jwt-secret-code", {
                expiresIn: "1d",
            });

            return {
                status: true,
                data: {
                    message: "Login success, here's your token",
                    token: token,
                },
            };
        } catch (error) {
            console.error("login auth module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };
}

module.exports = new _auth();
