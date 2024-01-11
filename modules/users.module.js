const prisma = require("../helpers/database");
const crypto = require("crypto-js");

class _users {
    getAccount = async () => {
        try {
            const account = await prisma.account.findMany({
                include: {
                    Role: true,
                    Mahasiswa: true,
                    Dosen: true,
                    Umum: true,
                    UKM: true,
                    Organisasi: true,
                },
            });

            if (account) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Account success",
                    data: account,
                };
            }
        } catch (error) {
            console.error("get account module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    updateStatusAccount = async (id, body) => {
        try {
            const account = await prisma.account.update({
                where: {
                    id_account: parseInt(id),
                },
                data: {
                    status_account: body.status_account,
                },
            });

            if (account) {
                if (account.id_role == 1) {
                    const dosen = await prisma.dosen.update({
                        where: {
                            id: parseInt(body.id),
                        },
                        data: {
                            status: body.status_account,
                        },
                    });
                } else if (account.id_role == 2) {
                    const mahasiswa = await prisma.mahasiswa.update({
                        where: {
                            id: parseInt(body.id),
                        },
                        data: {
                            status: body.status_account,
                        },
                    });
                } else if (account.id_role == 3) {
                    const umum = await prisma.umum.update({
                        where: {
                            id: parseInt(body.id),
                        },
                        data: {
                            status: body.status_account,
                        },
                    });
                } else if (account.id_role == 4) {
                    const ukm = await prisma.ukm.update({
                        where: {
                            id: parseInt(body.id),
                        },
                        data: {
                            status: body.status_account,
                        },
                    });
                } else if (account.id_role == 5) {
                    const organisasi = await prisma.organisasi.update({
                        where: {
                            id: parseInt(body.id),
                        },
                        data: {
                            status: body.status_account,
                        },
                    });
                }

                return {
                    status: true,
                    code: 200,
                    message: "Update status_account success",
                };
            }
        } catch (error) {
            console.error("update account module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getDosen = async () => {
        try {
            const dosen = await prisma.dosen.findMany({});

            if (dosen) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Dosen success",
                    data: dosen,
                };
            }
        } catch (error) {
            console.error("get dosen module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getUkm = async () => {
        try {
            const Ukm = await prisma.ukm.findMany({});

            if (Ukm) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Ukm success",
                    data: Ukm,
                };
            }
        } catch (error) {
            console.error("get Ukm module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getOrganisasi = async () => {
        try {
            const organisasi = await prisma.organisasi.findMany({});

            if (organisasi) {
                return {
                    status: true,
                    code: 200,
                    message: "Get organisasi success",
                    data: organisasi,
                };
            }
        } catch (error) {
            console.error("get organisasi module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getMahasiswa = async () => {
        try {
            const mahasiswa = await prisma.mahasiswa.findMany({
                include: {
                    Fakultas: true,
                    Prodi: true,
                },
            });

            if (mahasiswa) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Mahasiswa success",
                    data: mahasiswa,
                };
            }
        } catch (error) {
            console.error("get mahasiswa module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getUmum = async () => {
        try {
            const umum = await prisma.umum.findMany({});

            if (umum) {
                return {
                    status: true,
                    code: 200,
                    message: "Get umum success",
                    data: umum,
                };
            }
        } catch (error) {
            console.error("get umum module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getAccountById = async (id) => {
        try {
            const account = await prisma.account.findUnique({
                where: {
                    id_account: Number(id),
                },
                include: {
                    Mahasiswa: true,
                    Dosen: true,
                    Umum: true,
                },
            });

            if (account) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Account success",
                    data: account,
                };
            }
        } catch (error) {
            console.error("get account module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getMahasiswaSpecific = async (id) => {
        try {
            const account = await prisma.mahasiswa.findUnique({
                where: {
                    id_account: Number(id),
                },
            });

            if (account) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Mahasiswa Specific success",
                    data: account,
                };
            }
        } catch (error) {
            console.error("get account module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getUmumSpecific = async (id) => {
        try {
            const account = await prisma.umum.findUnique({
                where: {
                    id_account: Number(id),
                },
            });

            if (account) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Umum Specific success",
                    data: account,
                };
            }
        } catch (error) {
            console.error("get account module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getOrganisasiSpecific = async (id) => {
        try {
            const account = await prisma.organisasi.findUnique({
                where: {
                    id_account: Number(id),
                },
            });

            if (account) {
                return {
                    status: true,
                    code: 200,
                    message: "Get Organisasi Specific success",
                    data: account,
                };
            }
        } catch (error) {
            console.error("get account module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getUkmSpecific = async (id) => {
        try {
            const account = await prisma.ukm.findUnique({
                where: {
                    id_account: Number(id),
                },
            });

            if (account) {
                return {
                    status: true,
                    code: 200,
                    message: "Get UKM Specific success",
                    data: account,
                };
            }
        } catch (error) {
            console.error("get account module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    updateUkm = async (id, body) => {
        try {
            const account = await prisma.ukm.update({
                where: {
                    id_account: parseInt(id),
                },
                data: {
                    nama_ukm: body.nama_ukm,
                    no_telp: body.no_telp,
		    password: body.password,
                    nama_pj: body.nama_pj,
                },
            });

            if (account) {
                return {
                    status: true,
                    code: 200,
                    message: "Update UKM success",
                };
            }
        } catch (error) {
            console.error("update account module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    updateOrganisasi = async (id, body) => {
        try {
            const account = await prisma.organisasi.update({
                where: {
                    id_account: parseInt(id),
                },
                data: {
                    nama_organisasi: body.nama_organisasi,
                    no_telp: body.no_telp,
		    password: body.password,
                    nama_pj: body.nama_pj,
                },
            });

            if (account) {
                return {
                    status: true,
                    code: 200,
                    message: "Update UKM success",
                };
            }
        } catch (error) {
            console.error("update account module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

updateMahasiswa = async (id, body) => {
    try {
        if (!body) {
            return {
                status: false,
                error: "Request body is undefined.",
            };
        }

        const account = await prisma.mahasiswa.update({
            where: {
                id_account: parseInt(id),
            },
            data: {
                nama: body.nama,
                no_telp: body.no_telp,
		password: body.password,
            },
        });

        if (account) {
            return {
                status: true,
                code: 200,
                message: "Update Mahasiswa success",
            };
        }
    } catch (error) {
        console.error("update account module Error: ", error);
        return {
            status: false,
            error,
        };
    }
};


    updateUmum = async (id, body) => {
        try {
            const account = await prisma.umum.update({
                where: {
                    id_account: parseInt(id),
                },
                data: {
                    nama: body.nama,
                    no_telp: body.no_telp,
		    password: body.password,
                },
            });

            if (account) {
                return {
                    status: true,
                    code: 200,
                    message: "Update Umum success",
                };
            }
        } catch (error) {
            console.error("update account module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    updateStatus = async (id, body) => {
        try {
            const account = await prisma.account.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    status_account: body.status_account,
                },
            });

            if (account) {
                return {
                    status: true,
                    code: 200,
                    message: "Update status_account success",
                };
            }
        } catch (error) {
            console.error("update account module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    updateStatusMahasiswa = async (id, body) => {
        try {
            const mahasiswa = await prisma.mahasiswa.update({
                where: {
                    id_mahasiswa: parseInt(id),
                },
                data: {
                    status: body.status,
                },
            });

            if (mahasiswa) {
                return {
                    status: true,
                    code: 200,
                    message: "Update status_mahasiswa success",
                };
            }
        } catch (error) {
            console.error("update mahasiswa module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    deleteDosen = async (id) => {
        try {
            const account = await prisma.dosen.delete({
                where: {
                    id: parseInt(id),
                },
            });

            if (account) {
                return {
                    status: true,
                    code: 200,
                    message: "Delete Account success",
                };
            }
        } catch (error) {
            console.error("delete account module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    deleteUmum = async (id) => {
        try {
            const umum = await prisma.umum.delete({
                where: {
                    id: parseInt(id),
                },
            });

            if (umum) {
                return {
                    status: true,
                    code: 200,
                    message: "Delete Account success",
                };
            }
        } catch (error) {
            console.error("delete account module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    deleteMahasiswa = async (id) => {
        try {
            const account = await prisma.mahasiswa.delete({
                where: {
                    id: parseInt(id),
                },
            });

            if (account) {
                return {
                    status: true,
                    code: 200,
                    message: "Delete Account success",
                };
            }
        } catch (error) {
            console.error("delete account module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    checkExpiredMahasiswa = async (id) => {
        try {
            const mahasiswa = await prisma.mahasiswa.findFirst({
                where: {
                    id_account: parseInt(id),
                },
            });

            const tahun_ajaran = await prisma.tahun_ajaran.findUnique({
                where: {
                    id_tahun_ajaran: parseInt(mahasiswa.id_tahun_ajaran),
                },
            });

            if (
                Number(tahun_ajaran.tahun_ajaran.split("/")[0]) + 1 >=
                new Date().getFullYear()
            ) {
                return {
                    status: true,
                    code: 200,
                    message: "anda masih dapat booking asrama",
                };
            } else {
                return {
                    status: false,
                    code: 200,
                    message: "anda tidak dapat booking asrama",
                };
            }
        } catch (error) {
            console.error("delete expired account module Error: ", error);
            throw error;
        }
    };

    checkEmail = async (email) => {
        try {
            const [mahasiswa, umum, ukm, organisasi] = await Promise.all([
                prisma.mahasiswa.findFirst({ where: email }),
                prisma.umum.findFirst({ where: email }),
                prisma.ukm.findFirst({ where: email }),
                prisma.organisasi.findFirst({ where: email }),
            ]);

            const isEmailRegistered = mahasiswa
                ? true
                : umum
                ? true
                : ukm
                ? true
                : organisasi
                ? true
                : false;

            return {
                status: isEmailRegistered,
                code: 200,
                message: isEmailRegistered
                    ? "Email sudah terdaftar"
                    : "Email belum terdaftar",
            };
        } catch (error) {
            console.error("check email module Error: ", error);
            throw error;
        }
    };

    resetPassword = async (email, password) => {
        try {
            const [mahasiswa, umum, ukm, organisasi] = await Promise.all([
                prisma.mahasiswa.findFirst({
                    where: {
                        email: email,
                    },
                }),
                prisma.umum.findFirst({
                    where: {
                        email: email,
                    },
                }),
                prisma.ukm.findFirst({
                    where: {
                        email: email,
                    },
                }),
                prisma.organisasi.findFirst({
                    where: {
                        email: email,
                    },
                }),
            ]);

            const isEmailRegistered = mahasiswa
                ? true
                : umum
                ? true
                : ukm
                ? true
                : organisasi
                ? true
                : false;

            if (isEmailRegistered) {
                const hash_password = crypto.AES.encrypt(
                    password,
                    process.env.SECRET_KEY
                ).toString();
                if (mahasiswa) {
                    const putMahasiswa = await prisma.mahasiswa.update({
                        where: {
                            email: email,
                        },
                        data: {
                            password: hash_password,
                        },
                    });
                } else if (umum) {
                    const putUmum = await prisma.umum.update({
                        where: {
                            email: email,
                        },
                        data: {
                            password: hash_password,
                        },
                    });
                }

                return {
                    status: true,
                    code: 200,
                    message: "Reset password berhasil",
                };
            } else {
                return {
                    status: false,
                    code: 200,
                    message: "Reset password gagal",
                };
            }
        } catch (error) {
            console.error("reset password module Error: ", error);
            throw error;
        }
    };
}

module.exports = new _users();
