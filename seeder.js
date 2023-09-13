const createMahasiswa = async () => {
    const mahasiswa = await prisma.mahasiswa.create({
        data: [
            {
                nama: "Mochammad Fauzan",
                nim: "H1051191040",
                email: "",
                fakultas: "Teknik",
                jurusan: "Teknik Informatika",
                prodi: "S1",
                angkatan: "2019",
                no_hp: "08123456789",
            },
        ],
    });
};
