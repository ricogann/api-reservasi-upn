const prisma = require("../helpers/database");
const bcrypt = require("bcrypt");

class _seeder {
    migrateSeeder = async () => {
        try {
            // data fakultas
            const fakultas = await prisma.fakultas.createMany({
                data: [
                    {
                        nama_fakultas: "Kedokteran",
                    },
                    {
                        nama_fakultas: "Ekonomi dan Bisnis",
                    },
                    {
                        nama_fakultas: "Pertanian",
                    },
                    {
                        nama_fakultas: "Teknik",
                    },
                    {
                        nama_fakultas: "Ilmu Sosial dan Ilmu Politik",
                    },
                    {
                        nama_fakultas: "Ilmu Komputer",
                    },
                    {
                        nama_fakultas: "Arsitektur dan Desain",
                    },
                    {
                        nama_fakultas: "Hukum",
                    },
                ],
            });

            //data prodi
            const prodi = await prisma.prodi.createMany({
                data: [
                    {
                        nama_prodi: "Sarjana Kedokteran",
                        id_fakultas: 1,
                    },
                    {
                        nama_prodi: "Akuntansi",
                        id_fakultas: 2,
                    },
                    {
                        nama_prodi: "Manajemen",
                        id_fakultas: 2,
                    },
                    {
                        nama_prodi: "Ekonomi Pembangunan",
                        id_fakultas: 2,
                    },
                    {
                        nama_prodi: "Kewirausahaan",
                        id_fakultas: 2,
                    },
                    {
                        nama_prodi: "Agroteknologi",
                        id_fakultas: 3,
                    },
                    {
                        nama_prodi: "Agribisnis",
                        id_fakultas: 3,
                    },
                    {
                        nama_prodi: "Teknik Kimia",
                        id_fakultas: 4,
                    },
                    {
                        nama_prodi: "Teknik Industri",
                        id_fakultas: 4,
                    },
                    {
                        nama_prodi: "Teknologi Pangan",
                        id_fakultas: 4,
                    },
                    {
                        nama_prodi: "Teknik Lingkungan",
                        id_fakultas: 4,
                    },
                    {
                        nama_prodi: "Teknik Sipil",
                        id_fakultas: 4,
                    },
                    {
                        nama_prodi: "Teknik Mesin",
                        id_fakultas: 4,
                    },
                    {
                        nama_prodi: "Fisika",
                        id_fakultas: 4,
                    },
                    {
                        nama_prodi: "Administrasi Publik",
                        id_fakultas: 5,
                    },
                    {
                        nama_prodi: "Administrasi Bisnis",
                        id_fakultas: 5,
                    },
                    {
                        nama_prodi: "Ilmu Komunikasi",
                        id_fakultas: 5,
                    },
                    {
                        nama_prodi: "Ilmu Hubungan Internasional",
                        id_fakultas: 5,
                    },
                    {
                        nama_prodi: "Pariwisata",
                        id_fakultas: 5,
                    },
                    {
                        nama_prodi: "Linguistik Indonesia",
                        id_fakultas: 5,
                    },
                    {
                        nama_prodi: "Teknik Informatika",
                        id_fakultas: 6,
                    },
                    {
                        nama_prodi: "Sistem Informasi",
                        id_fakultas: 6,
                    },
                    {
                        nama_prodi: "Data Sains",
                        id_fakultas: 6,
                    },
                    {
                        nama_prodi: "Bisnis Digital",
                        id_fakultas: 6,
                    },
                    {
                        nama_prodi: "Arsitektur",
                        id_fakultas: 7,
                    },
                    {
                        nama_prodi: "Desain Komunikasi Visual",
                        id_fakultas: 7,
                    },
                    {
                        nama_prodi: "Desain Interior",
                        id_fakultas: 7,
                    },
                    {
                        nama_prodi: "Hukum",
                        id_fakultas: 8,
                    },
                ],
            });

            // data role
            const role = await prisma.role.createMany({
                data: [
                    {
                        nama_role: "dosen",
                    },
                    {
                        nama_role: "mahasiswa",
                    },
                    {
                        nama_role: "umum",
                    },
                ],
            });

            // data admin
            const admin = await prisma.admin.create({
                data: {
                    username_admin: "admin",
                    password_admin: await bcrypt.hash("admin12", 10),
                },
            });

            // data tahun ajaran mahasiswa
            const tahun_ajaran_mahasiswa =
                await prisma.tahun_ajaran_mahasiswa.createMany({
                    data: [
                        {
                            tahun_ajaran: "2023/2024",
                        },
                        {
                            tahun_ajaran: "2022/2023",
                        },
                        {
                            tahun_ajaran: "2021/2022",
                        },
                        {
                            tahun_ajaran: "2020/2021",
                        },
                        {
                            tahun_ajaran: "2019/2020",
                        },
                        {
                            tahun_ajaran: "2018/2019",
                        },
                        {
                            tahun_ajaran: "2017/2018",
                        },
                        {
                            tahun_ajaran: "2016/2017",
                        },
                        {
                            tahun_ajaran: "2015/2016",
                        },
                        {
                            tahun_ajaran: "2014/2015",
                        },
                    ],
                });

            const jenis_fasilitas = await prisma.jenis_fasilitas.createMany({
                data: [
                    {
                        nama_jenis_fasilitas: "Asrama",
                    },
                    {
                        nama_jenis_fasilitas: "Gedung",
                    },
                    {
                        nama_jenis_fasilitas: "Ruangan",
                    },
                    {
                        nama_jenis_fasilitas: "Lapangan",
                    },
                    {
                        nama_jenis_fasilitas: "Kantin",
                    },
                ],
            });

            const mahasiswa = await prisma.mahasiswa.createMany({
                data: [
                    {
                        nama_mahasiswa: "Rico Putra Anugerah",
                        npm_mahasiswa: "20081010024",
                        password_mahasiswa: await bcrypt.hash("12345678", 10),
                        id_tahun_ajaran: 4,
                        id_fakultas: 6,
                        id_prodi: 21,
                        no_telp_mahasiswa: "089682285841",
                        bukti_regis_mahasiswa:
                            "1694263931705-about-picture-2.jpeg",
                        status_mahasiswa: false,
                    },
                    {
                        nama_mahasiswa: "Hanif Al-Fathoni",
                        npm_mahasiswa: "20081010001",
                        password_mahasiswa: await bcrypt.hash("12345678", 10),
                        id_tahun_ajaran: 4,
                        id_fakultas: 6,
                        id_prodi: 21,
                        no_telp_mahasiswa: "089682285841",
                        bukti_regis_mahasiswa:
                            "1694263931705-about-picture-2.jpeg",
                        status_mahasiswa: false,
                    },
                    {
                        nama_mahasiswa: "Fanesa Dhea putri Liskarina",
                        npm_mahasiswa: "20081010025",
                        password_mahasiswa: await bcrypt.hash("12345678", 10),
                        id_tahun_ajaran: 4,
                        id_fakultas: 6,
                        id_prodi: 21,
                        no_telp_mahasiswa: "089682285841",
                        bukti_regis_mahasiswa:
                            "1694263931705-about-picture-2.jpeg",
                        status_mahasiswa: false,
                    },
                ],
            });

            const account = await prisma.account.createMany({
                data: [
                    {
                        NIK: "1234567891011",
                        nama: "Rico Putra Anugerah",
                        email: "rico.putra95@gmail.com",
                        password: await bcrypt.hash("12345678", 10),
                        no_telp: "089682285841",
                        bukti_regis: "1694263931705-about-picture-2.jpeg",
                        id_role: 3,
                        status_account: false,
                    },
                    {
                        NIP: "1234567",
                        nama: "Pak Soegi",
                        email: "pak.soegi@gmail.com",
                        password: await bcrypt.hash("12345678", 10),
                        no_telp: "089682285841",
                        bukti_regis: "1694263931705-about-picture-2.jpeg",
                        id_role: 1,
                        status_account: false,
                    },
                ],
            });

            const lantai = await prisma.lantai_asrama.createMany({
                data: [
                    {
                        lantai: 1,
                        harga_lantai: 5450000,
                    },
                    {
                        lantai: 2,
                        harga_lantai: 5050000,
                    },
                    {
                        lantai: 3,
                        harga_lantai: 4970000,
                    },
                    {
                        lantai: 4,
                        harga_lantai: 4550000,
                    },
                ],
            });

            const kamar_asrama = await prisma.kamar_asrama.createMany({
                data: [
                    { no_kamar: 101, id_lantai: 1, status_kamar: false },
                    { no_kamar: 102, id_lantai: 1, status_kamar: false },
                    { no_kamar: 103, id_lantai: 1, status_kamar: false },
                    { no_kamar: 104, id_lantai: 1, status_kamar: false },
                    { no_kamar: 105, id_lantai: 1, status_kamar: false },
                    { no_kamar: 106, id_lantai: 1, status_kamar: false },
                    { no_kamar: 107, id_lantai: 1, status_kamar: false },
                    { no_kamar: 108, id_lantai: 1, status_kamar: false },
                    { no_kamar: 109, id_lantai: 1, status_kamar: false },
                    { no_kamar: 110, id_lantai: 1, status_kamar: false },
                    { no_kamar: 111, id_lantai: 1, status_kamar: false },
                    { no_kamar: 112, id_lantai: 1, status_kamar: false },
                    { no_kamar: 113, id_lantai: 1, status_kamar: false },
                    { no_kamar: 114, id_lantai: 1, status_kamar: false },
                    { no_kamar: 115, id_lantai: 1, status_kamar: false },
                    { no_kamar: 116, id_lantai: 1, status_kamar: false },
                    { no_kamar: 117, id_lantai: 1, status_kamar: false },
                    { no_kamar: 118, id_lantai: 1, status_kamar: false },
                    { no_kamar: 119, id_lantai: 1, status_kamar: false },
                    { no_kamar: 201, id_lantai: 2, status_kamar: false },
                    { no_kamar: 202, id_lantai: 2, status_kamar: false },
                    { no_kamar: 203, id_lantai: 2, status_kamar: false },
                    { no_kamar: 204, id_lantai: 2, status_kamar: false },
                    { no_kamar: 205, id_lantai: 2, status_kamar: false },
                    { no_kamar: 206, id_lantai: 2, status_kamar: false },
                    { no_kamar: 207, id_lantai: 2, status_kamar: false },
                    { no_kamar: 208, id_lantai: 2, status_kamar: false },
                    { no_kamar: 209, id_lantai: 2, status_kamar: false },
                    { no_kamar: 210, id_lantai: 2, status_kamar: false },
                    { no_kamar: 211, id_lantai: 2, status_kamar: false },
                    { no_kamar: 212, id_lantai: 2, status_kamar: false },
                    { no_kamar: 213, id_lantai: 2, status_kamar: false },
                    { no_kamar: 214, id_lantai: 2, status_kamar: false },
                    { no_kamar: 215, id_lantai: 2, status_kamar: false },
                    { no_kamar: 216, id_lantai: 2, status_kamar: false },
                    { no_kamar: 217, id_lantai: 2, status_kamar: false },
                    { no_kamar: 218, id_lantai: 2, status_kamar: false },
                    { no_kamar: 219, id_lantai: 2, status_kamar: false },
                    { no_kamar: 220, id_lantai: 2, status_kamar: false },
                    { no_kamar: 221, id_lantai: 2, status_kamar: false },
                    { no_kamar: 222, id_lantai: 2, status_kamar: false },
                    { no_kamar: 223, id_lantai: 2, status_kamar: false },
                    { no_kamar: 224, id_lantai: 2, status_kamar: false },
                    { no_kamar: 301, id_lantai: 3, status_kamar: false },
                    { no_kamar: 302, id_lantai: 3, status_kamar: false },
                    { no_kamar: 303, id_lantai: 3, status_kamar: false },
                    { no_kamar: 304, id_lantai: 3, status_kamar: false },
                    { no_kamar: 305, id_lantai: 3, status_kamar: false },
                    { no_kamar: 306, id_lantai: 3, status_kamar: false },
                    { no_kamar: 307, id_lantai: 3, status_kamar: false },
                    { no_kamar: 308, id_lantai: 3, status_kamar: false },
                    { no_kamar: 309, id_lantai: 3, status_kamar: false },
                    { no_kamar: 310, id_lantai: 3, status_kamar: false },
                    { no_kamar: 311, id_lantai: 3, status_kamar: false },
                    { no_kamar: 312, id_lantai: 3, status_kamar: false },
                    { no_kamar: 313, id_lantai: 3, status_kamar: false },
                    { no_kamar: 314, id_lantai: 3, status_kamar: false },
                    { no_kamar: 315, id_lantai: 3, status_kamar: false },
                    { no_kamar: 316, id_lantai: 3, status_kamar: false },
                    { no_kamar: 317, id_lantai: 3, status_kamar: false },
                    { no_kamar: 318, id_lantai: 3, status_kamar: false },
                    { no_kamar: 319, id_lantai: 3, status_kamar: false },
                    { no_kamar: 320, id_lantai: 3, status_kamar: false },
                    { no_kamar: 321, id_lantai: 3, status_kamar: false },
                    { no_kamar: 322, id_lantai: 3, status_kamar: false },
                    { no_kamar: 323, id_lantai: 3, status_kamar: false },
                    { no_kamar: 324, id_lantai: 3, status_kamar: false },
                    { no_kamar: 401, id_lantai: 4, status_kamar: false },
                    { no_kamar: 402, id_lantai: 4, status_kamar: false },
                    { no_kamar: 403, id_lantai: 4, status_kamar: false },
                    { no_kamar: 404, id_lantai: 4, status_kamar: false },
                    { no_kamar: 405, id_lantai: 4, status_kamar: false },
                    { no_kamar: 406, id_lantai: 4, status_kamar: false },
                    { no_kamar: 407, id_lantai: 4, status_kamar: false },
                    { no_kamar: 408, id_lantai: 4, status_kamar: false },
                    { no_kamar: 409, id_lantai: 4, status_kamar: false },
                    { no_kamar: 410, id_lantai: 4, status_kamar: false },
                    { no_kamar: 411, id_lantai: 4, status_kamar: false },
                    { no_kamar: 412, id_lantai: 4, status_kamar: false },
                    { no_kamar: 413, id_lantai: 4, status_kamar: false },
                    { no_kamar: 414, id_lantai: 4, status_kamar: false },
                    { no_kamar: 415, id_lantai: 4, status_kamar: false },
                    { no_kamar: 416, id_lantai: 4, status_kamar: false },
                    { no_kamar: 417, id_lantai: 4, status_kamar: false },
                    { no_kamar: 418, id_lantai: 4, status_kamar: false },
                    { no_kamar: 419, id_lantai: 4, status_kamar: false },
                    { no_kamar: 420, id_lantai: 4, status_kamar: false },
                    { no_kamar: 421, id_lantai: 4, status_kamar: false },
                    { no_kamar: 422, id_lantai: 4, status_kamar: false },
                    { no_kamar: 423, id_lantai: 4, status_kamar: false },
                    { no_kamar: 424, id_lantai: 4, status_kamar: false },
                ],
            });

            return {
                status: true,
                code: 201,
                message: "Seeder success",
            };
        } catch (error) {
            console.error("migrateSeeder seeder module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    migrateSeederNew = async () => {
        try {
            const role = await prisma.role.createMany({
                data: [
                    {
                        nama_role: "dosen",
                    },
                    {
                        nama_role: "mahasiswa",
                    },
                    {
                        nama_role: "umum",
                    },
                ],
            });

            const admin = await prisma.admin.create({
                data: {
                    username_admin: "admin",
                    password_admin: await bcrypt.hash("admin12", 10),
                },
            });

            const fakultas = await prisma.fakultas.createMany({
                data: [
                    {
                        nama_fakultas: "Kedokteran",
                    },
                    {
                        nama_fakultas: "Ekonomi dan Bisnis",
                    },
                    {
                        nama_fakultas: "Pertanian",
                    },
                    {
                        nama_fakultas: "Teknik",
                    },
                    {
                        nama_fakultas: "Ilmu Sosial dan Ilmu Politik",
                    },
                    {
                        nama_fakultas: "Ilmu Komputer",
                    },
                    {
                        nama_fakultas: "Arsitektur dan Desain",
                    },
                    {
                        nama_fakultas: "Hukum",
                    },
                ],
            });

            const prodi = await prisma.prodi.createMany({
                data: [
                    {
                        nama_prodi: "Sarjana Kedokteran",
                        id_fakultas: 1,
                    },
                    {
                        nama_prodi: "Akuntansi",
                        id_fakultas: 2,
                    },
                    {
                        nama_prodi: "Manajemen",
                        id_fakultas: 2,
                    },
                    {
                        nama_prodi: "Ekonomi Pembangunan",
                        id_fakultas: 2,
                    },
                    {
                        nama_prodi: "Kewirausahaan",
                        id_fakultas: 2,
                    },
                    {
                        nama_prodi: "Agroteknologi",
                        id_fakultas: 3,
                    },
                    {
                        nama_prodi: "Agribisnis",
                        id_fakultas: 3,
                    },
                    {
                        nama_prodi: "Teknik Kimia",
                        id_fakultas: 4,
                    },
                    {
                        nama_prodi: "Teknik Industri",
                        id_fakultas: 4,
                    },
                    {
                        nama_prodi: "Teknologi Pangan",
                        id_fakultas: 4,
                    },
                    {
                        nama_prodi: "Teknik Lingkungan",
                        id_fakultas: 4,
                    },
                    {
                        nama_prodi: "Teknik Sipil",
                        id_fakultas: 4,
                    },
                    {
                        nama_prodi: "Teknik Mesin",
                        id_fakultas: 4,
                    },
                    {
                        nama_prodi: "Fisika",
                        id_fakultas: 4,
                    },
                    {
                        nama_prodi: "Administrasi Publik",
                        id_fakultas: 5,
                    },
                    {
                        nama_prodi: "Administrasi Bisnis",
                        id_fakultas: 5,
                    },
                    {
                        nama_prodi: "Ilmu Komunikasi",
                        id_fakultas: 5,
                    },
                    {
                        nama_prodi: "Ilmu Hubungan Internasional",
                        id_fakultas: 5,
                    },
                    {
                        nama_prodi: "Pariwisata",
                        id_fakultas: 5,
                    },
                    {
                        nama_prodi: "Linguistik Indonesia",
                        id_fakultas: 5,
                    },
                    {
                        nama_prodi: "Teknik Informatika",
                        id_fakultas: 6,
                    },
                    {
                        nama_prodi: "Sistem Informasi",
                        id_fakultas: 6,
                    },
                    {
                        nama_prodi: "Data Sains",
                        id_fakultas: 6,
                    },
                    {
                        nama_prodi: "Bisnis Digital",
                        id_fakultas: 6,
                    },
                    {
                        nama_prodi: "Arsitektur",
                        id_fakultas: 7,
                    },
                    {
                        nama_prodi: "Desain Komunikasi Visual",
                        id_fakultas: 7,
                    },
                    {
                        nama_prodi: "Desain Interior",
                        id_fakultas: 7,
                    },
                    {
                        nama_prodi: "Hukum",
                        id_fakultas: 8,
                    },
                ],
            });

            const tahun_ajaran = await prisma.tahun_ajaran.createMany({
                data: [
                    {
                        tahun_ajaran: "2023/2024",
                    },
                    {
                        tahun_ajaran: "2022/2023",
                    },
                    {
                        tahun_ajaran: "2021/2022",
                    },
                    {
                        tahun_ajaran: "2020/2021",
                    },
                    {
                        tahun_ajaran: "2019/2020",
                    },
                    {
                        tahun_ajaran: "2018/2019",
                    },
                    {
                        tahun_ajaran: "2017/2018",
                    },
                    {
                        tahun_ajaran: "2016/2017",
                    },
                    {
                        tahun_ajaran: "2015/2016",
                    },
                    {
                        tahun_ajaran: "2014/2015",
                    },
                ],
            });

            const account = await prisma.account.createMany({
                data: [
                    {
                        id_role: 1,
                        status_account: false,
                    },
                    {
                        id_role: 2,
                        status_account: false,
                    },
                    {
                        id_role: 3,
                        status_account: false,
                    },
                ],
            });

            const mahasiswa = await prisma.mahasiswa.createMany({
                data: [
                    {
                        id_account: 2,
                        nama: "Rico Putra Anugerah",
                        npm: "20081010024",
                        email: "20081010024@student.upnjatim.ac.id",
                        password: await bcrypt.hash("12345678", 10),
                        id_tahun_ajaran: 4,
                        id_fakultas: 6,
                        id_prodi: 21,
                        no_telp: "089682285841",
                        bukti_identitas: "1694263931705-about-picture-2.jpeg",
                        status: false,
                    },
                ],
            });

            const dosen = await prisma.dosen.createMany({
                data: [
                    {
                        id_account: 1,
                        NIP: "1234567",
                        nama: "Pak Soegi",
                        no_telp: "089682285841",
                        email: "rico.putra95@gmail.com",
                        password: await bcrypt.hash("12345678", 10),
                        bukti_identitas: "1694263931705-about-picture-2.jpeg",
                        status: false,
                    },
                ],
            });

            const umum = await prisma.umum.createMany({
                data: [
                    {
                        id_account: 3,
                        NIK: "1234567891011",
                        nama: "Rico Putra Anugerah",
                        no_telp: "089682285841",
                        email: "rico.putra96@gmail.com",
                        password: await bcrypt.hash("12345678", 10),
                        bukti_identitas: "1694263931705-about-picture-2.jpeg",
                        status: false,
                    },
                ],
            });

            const fasilitas = await prisma.fasilitas.createMany({
                data: [
                    {
                        nama: "Giri Loka",
                        alamat: "Jl. Rungkut Madya, Gn. Anyar, Kec. Gn. Anyar, Surabaya, Jawa Timur 60294",
                        deskripsi: "Ini adalah deskripsi dari Giri Loka",
                        foto: "1694263931705-about-picture-2.jpeg",
                        jam_buka: "09:00",
                        jam_tutup: "22:00",
                        buka_hari: "Senin-Sabtu",
                        durasi: 60,
                    },
                    {
                        nama: "Asrama",
                        alamat: "Jl. Rungkut Madya, Gn. Anyar, Kec. Gn. Anyar, Surabaya, Jawa Timur 60294",
                        deskripsi: "Ini adalah deskripsi dari Asrama",
                        foto: "1694263931705-about-picture-2.jpeg",
                        jam_buka: "09:00",
                        jam_tutup: "22:00",
                        buka_hari: "Senin-Sabtu",
                        durasi: 1,
                    },
                    {
                        nama: "Lapangan Tenis",
                        alamat: "Jl. Rungkut Madya, Gn. Anyar, Kec. Gn. Anyar, Surabaya, Jawa Timur 60294",
                        deskripsi: "Ini adalah deskripsi dari Lapangan Tenis",
                        foto: "1694263931705-about-picture-2.jpeg",
                        jam_buka: "09:00",
                        jam_tutup: "22:00",
                        buka_hari: "Setiap Hari",
                        durasi: 1,
                    },
                    {
                        nama: "Giri Sena",
                        alamat: "Jl. Rungkut Madya, Gn. Anyar, Kec. Gn. Anyar, Surabaya, Jawa Timur 60294",
                        deskripsi: "Ini adalah deskripsi dari Sena",
                        foto: "1694263931705-about-picture-2.jpeg",
                        jam_buka: "09:00",
                        jam_tutup: "22:00",
                        buka_hari: "Senin-Sabtu",
                        durasi: 1,
                    },
                    {
                        nama: "Auditorium GKB I",
                        alamat: "Jl. Rungkut Madya, Gn. Anyar, Kec. Gn. Anyar, Surabaya, Jawa Timur 60294",
                        deskripsi: "Ini adalah deskripsi dari Auditorium GKB I",
                        foto: "1694263931705-about-picture-2.jpeg",
                        jam_buka: "09:00",
                        jam_tutup: "22:00",
                        buka_hari: "Senin-Sabtu",
                        durasi: 1,
                    },
                    {
                        nama: "Ballroom GKB II",
                        alamat: "Jl. Rungkut Madya, Gn. Anyar, Kec. Gn. Anyar, Surabaya, Jawa Timur 60294",
                        deskripsi: "Ini adalah deskripsi dari Ballroom GKB II",
                        foto: "1694263931705-about-picture-2.jpeg",
                        jam_buka: "09:00",
                        jam_tutup: "22:00",
                        buka_hari: "Senin-Sabtu",
                        durasi: 1,
                    },
                    {
                        nama: "Ruang Seminar FK",
                        alamat: "Jl. Rungkut Madya, Gn. Anyar, Kec. Gn. Anyar, Surabaya, Jawa Timur 60294",
                        deskripsi: "Ini adalah deskripsi dari Ruang Seminar FK",
                        foto: "1694263931705-about-picture-2.jpeg",
                        jam_buka: "09:00",
                        jam_tutup: "22:00",
                        buka_hari: "Senin-Sabtu",
                        durasi: 1,
                    },
                    {
                        nama: "Kolam Renang Giri Tirta",
                        alamat: "Jl. Rungkut Madya, Gn. Anyar, Kec. Gn. Anyar, Surabaya, Jawa Timur 60294",
                        deskripsi: "Ini adalah deskripsi dari Kolam Renang",
                        foto: "1694263931705-about-picture-2.jpeg",
                        jam_buka: "09:00",
                        jam_tutup: "22:00",
                        buka_hari: "Senin-Sabtu",
                        durasi: 1,
                    },
                    {
                        nama: "Lapangan Bola",
                        alamat: "Jl. Rungkut Madya, Gn. Anyar, Kec. Gn. Anyar, Surabaya, Jawa Timur 60294",
                        deskripsi: "Ini adalah deskripsi dari Bola",
                        foto: "1694263931705-about-picture-2.jpeg",
                        jam_buka: "09:00",
                        jam_tutup: "22:00",
                        buka_hari: "Senin-Sabtu",
                        durasi: 1,
                    },
                ],
            });

            const harga = await prisma.harga.createMany({
                data: [
                    {
                        id_fasilitas: 1,
                        nama: "Hall Pagi (Weekday)",
                        harga: 350000,
                    },
                    {
                        id_fasilitas: 1,
                        nama: "Hall Malam (Weekday)",
                        harga: 500000,
                    },
                    {
                        id_fasilitas: 1,
                        nama: "Hall Pagi (Weekend)",
                        harga: 670000,
                    },
                    {
                        id_fasilitas: 1,
                        nama: "Hall Malam (Weekend)",
                        harga: 750000,
                    },
                    {
                        id_fasilitas: 1,
                        nama: "Tribun Pagi (Weekend)",
                        harga: 375000,
                    },
                    {
                        id_fasilitas: 1,
                        nama: "Tribun Malam (Weekend)",
                        harga: 700000,
                    },
                    {
                        id_fasilitas: 1,
                        nama: "VIP",
                        harga: 250000,
                    },
                    {
                        id_fasilitas: 3,
                        nama: "Pagi",
                        harga: 50000,
                    },
                    {
                        id_fasilitas: 3,
                        nama: "Malam",
                        harga: 55000,
                    },
                    {
                        id_fasilitas: 4,
                        nama: "Girisena Kamar 101",
                        harga: 500000,
                    },
                    {
                        id_fasilitas: 4,
                        nama: "Girisena Kamar 102",
                        harga: 350000,
                    },
                    {
                        id_fasilitas: 4,
                        nama: "Girisena Kamar 103",
                        harga: 250000,
                    },
                    {
                        id_fasilitas: 4,
                        nama: "Girisena Kamar 104",
                        harga: 250000,
                    },
                    {
                        id_fasilitas: 4,
                        nama: "Girisena Kamar 105",
                        harga: 300000,
                    },
                    {
                        id_fasilitas: 4,
                        nama: "Girisena Kamar 106",
                        harga: 300000,
                    },
                    {
                        id_fasilitas: 4,
                        nama: "Girisena Kamar 107",
                        harga: 230000,
                    },
                    {
                        id_fasilitas: 4,
                        nama: "Girisena Kamar 108",
                        harga: 230000,
                    },
                    {
                        id_fasilitas: 4,
                        nama: "Girisena Kamar 109",
                        harga: 175000,
                    },
                    {
                        id_fasilitas: 4,
                        nama: "Girisena Kamar 110",
                        harga: 175000,
                    },
                    {
                        id_fasilitas: 2,
                        nama: "Lantai 1",
                        harga: 2600000,
                    },
                    {
                        id_fasilitas: 2,
                        nama: "Lantai 2",
                        harga: 2400000,
                    },
                    {
                        id_fasilitas: 2,
                        nama: "Lantai 3",
                        harga: 2360000,
                    },
                    {
                        id_fasilitas: 2,
                        nama: "Lantai 4",
                        harga: 2350000,
                    },
                ],
            });

            const kamar_asrama = await prisma.kamar_asrama.createMany({
                data: [
                    { no_kamar: 101, id: 20, status_kamar: true },
                    { no_kamar: 102, id: 20, status_kamar: true },
                    { no_kamar: 103, id: 20, status_kamar: true },
                    { no_kamar: 104, id: 20, status_kamar: true },
                    { no_kamar: 105, id: 20, status_kamar: true },
                    { no_kamar: 106, id: 20, status_kamar: true },
                    { no_kamar: 107, id: 20, status_kamar: true },
                    { no_kamar: 108, id: 20, status_kamar: true },
                    { no_kamar: 109, id: 20, status_kamar: true },
                    { no_kamar: 110, id: 20, status_kamar: true },
                    { no_kamar: 111, id: 20, status_kamar: true },
                    { no_kamar: 112, id: 20, status_kamar: true },
                    { no_kamar: 113, id: 20, status_kamar: true },
                    { no_kamar: 114, id: 20, status_kamar: true },
                    { no_kamar: 115, id: 20, status_kamar: true },
                    { no_kamar: 116, id: 20, status_kamar: true },
                    { no_kamar: 117, id: 20, status_kamar: true },
                    { no_kamar: 118, id: 20, status_kamar: true },
                    { no_kamar: 119, id: 20, status_kamar: true },
                    { no_kamar: 201, id: 21, status_kamar: true },
                    { no_kamar: 202, id: 21, status_kamar: true },
                    { no_kamar: 203, id: 21, status_kamar: true },
                    { no_kamar: 204, id: 21, status_kamar: true },
                    { no_kamar: 205, id: 21, status_kamar: true },
                    { no_kamar: 206, id: 21, status_kamar: true },
                    { no_kamar: 207, id: 21, status_kamar: true },
                    { no_kamar: 208, id: 21, status_kamar: true },
                    { no_kamar: 209, id: 21, status_kamar: true },
                    { no_kamar: 210, id: 21, status_kamar: true },
                    { no_kamar: 211, id: 21, status_kamar: true },
                    { no_kamar: 212, id: 21, status_kamar: true },
                    { no_kamar: 213, id: 21, status_kamar: true },
                    { no_kamar: 214, id: 21, status_kamar: true },
                    { no_kamar: 215, id: 21, status_kamar: true },
                    { no_kamar: 216, id: 21, status_kamar: true },
                    { no_kamar: 217, id: 21, status_kamar: true },
                    { no_kamar: 218, id: 21, status_kamar: true },
                    { no_kamar: 219, id: 21, status_kamar: true },
                    { no_kamar: 220, id: 21, status_kamar: true },
                    { no_kamar: 221, id: 21, status_kamar: true },
                    { no_kamar: 222, id: 21, status_kamar: true },
                    { no_kamar: 223, id: 21, status_kamar: true },
                    { no_kamar: 224, id: 21, status_kamar: true },
                    { no_kamar: 301, id: 22, status_kamar: true },
                    { no_kamar: 302, id: 22, status_kamar: true },
                    { no_kamar: 303, id: 22, status_kamar: true },
                    { no_kamar: 304, id: 22, status_kamar: true },
                    { no_kamar: 305, id: 22, status_kamar: true },
                    { no_kamar: 306, id: 22, status_kamar: true },
                    { no_kamar: 307, id: 22, status_kamar: true },
                    { no_kamar: 308, id: 22, status_kamar: true },
                    { no_kamar: 309, id: 22, status_kamar: true },
                    { no_kamar: 310, id: 22, status_kamar: true },
                    { no_kamar: 311, id: 22, status_kamar: true },
                    { no_kamar: 312, id: 22, status_kamar: true },
                    { no_kamar: 313, id: 22, status_kamar: true },
                    { no_kamar: 314, id: 22, status_kamar: true },
                    { no_kamar: 315, id: 22, status_kamar: true },
                    { no_kamar: 316, id: 22, status_kamar: true },
                    { no_kamar: 317, id: 22, status_kamar: true },
                    { no_kamar: 318, id: 22, status_kamar: true },
                    { no_kamar: 319, id: 22, status_kamar: true },
                    { no_kamar: 320, id: 22, status_kamar: true },
                    { no_kamar: 321, id: 22, status_kamar: true },
                    { no_kamar: 322, id: 22, status_kamar: true },
                    { no_kamar: 323, id: 22, status_kamar: true },
                    { no_kamar: 324, id: 22, status_kamar: true },
                    { no_kamar: 401, id: 23, status_kamar: true },
                    { no_kamar: 402, id: 23, status_kamar: true },
                    { no_kamar: 403, id: 23, status_kamar: true },
                    { no_kamar: 404, id: 23, status_kamar: true },
                    { no_kamar: 405, id: 23, status_kamar: true },
                    { no_kamar: 406, id: 23, status_kamar: true },
                    { no_kamar: 407, id: 23, status_kamar: true },
                    { no_kamar: 408, id: 23, status_kamar: true },
                    { no_kamar: 409, id: 23, status_kamar: true },
                    { no_kamar: 410, id: 23, status_kamar: true },
                    { no_kamar: 411, id: 23, status_kamar: true },
                    { no_kamar: 412, id: 23, status_kamar: true },
                    { no_kamar: 413, id: 23, status_kamar: true },
                    { no_kamar: 414, id: 23, status_kamar: true },
                    { no_kamar: 415, id: 23, status_kamar: true },
                    { no_kamar: 416, id: 23, status_kamar: true },
                    { no_kamar: 417, id: 23, status_kamar: true },
                    { no_kamar: 418, id: 23, status_kamar: true },
                    { no_kamar: 419, id: 23, status_kamar: true },
                    { no_kamar: 420, id: 23, status_kamar: true },
                    { no_kamar: 421, id: 23, status_kamar: true },
                    { no_kamar: 422, id: 23, status_kamar: true },
                    { no_kamar: 423, id: 23, status_kamar: true },
                    { no_kamar: 424, id: 23, status_kamar: true },
                ],
            });

            return {
                status: true,
                code: 201,
                message: "Seeder success",
            };
        } catch (error) {
            console.error("migrateSeeder seeder module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };
}

module.exports = new _seeder();
