-- CreateTable
CREATE TABLE `Mahasiswa` (
    `id_mahasiswa` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_mahasiswa` VARCHAR(191) NOT NULL,
    `npm_mahasiswa` VARCHAR(191) NOT NULL,
    `password_mahasiswa` VARCHAR(191) NOT NULL,
    `id_tahun_ajaran` INTEGER NOT NULL,
    `id_fakultas` INTEGER NOT NULL,
    `id_prodi` INTEGER NOT NULL,
    `no_telp_mahasiswa` VARCHAR(191) NOT NULL,
    `bukti_regis_mahasiswa` VARCHAR(191) NOT NULL,
    `status_mahasiswa` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Mahasiswa_npm_mahasiswa_key`(`npm_mahasiswa`),
    PRIMARY KEY (`id_mahasiswa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `NIK` VARCHAR(191) NULL,
    `NIP` VARCHAR(191) NULL,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `no_telp` VARCHAR(191) NOT NULL,
    `bukti_regis` VARCHAR(191) NOT NULL,
    `id_role` INTEGER NOT NULL,
    `status_account` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Account_NIK_key`(`NIK`),
    UNIQUE INDEX `Account_NIP_key`(`NIP`),
    UNIQUE INDEX `Account_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fakultas` (
    `id_fakultas` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_fakultas` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_fakultas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prodi` (
    `id_prodi` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_prodi` VARCHAR(191) NOT NULL,
    `id_fakultas` INTEGER NOT NULL,

    PRIMARY KEY (`id_prodi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tahun_ajaran_mahasiswa` (
    `id_tahun_ajaran` INTEGER NOT NULL AUTO_INCREMENT,
    `tahun_ajaran` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_tahun_ajaran`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id_role` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jenis_fasilitas` (
    `id_jenis_fasilitas` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_jenis_fasilitas` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_jenis_fasilitas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id_admin` INTEGER NOT NULL AUTO_INCREMENT,
    `username_admin` VARCHAR(191) NOT NULL,
    `password_admin` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fasilitas` (
    `id_fasilitas` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_fasilitas` VARCHAR(191) NOT NULL,
    `alamat_fasilitas` VARCHAR(191) NOT NULL,
    `deskripsi_fasilitas` VARCHAR(191) NOT NULL,
    `biaya_fasilitas` INTEGER NOT NULL,
    `jam_masuk` VARCHAR(191) NOT NULL,
    `jam_keluar` VARCHAR(191) NOT NULL,
    `foto_fasilitas` VARCHAR(191) NOT NULL,
    `status_fasilitas` BOOLEAN NOT NULL,
    `id_jenis_fasilitas` INTEGER NOT NULL,

    PRIMARY KEY (`id_fasilitas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kamar_asrama` (
    `id_asrama` INTEGER NOT NULL AUTO_INCREMENT,
    `no_kamar` INTEGER NOT NULL,
    `id_lantai` INTEGER NOT NULL,
    `npm_bed1_a` VARCHAR(191) NULL,
    `npm_bed2_b` VARCHAR(191) NULL,
    `npm_bed3_c` VARCHAR(191) NULL,
    `status_kamar` BOOLEAN NOT NULL,

    PRIMARY KEY (`id_asrama`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lantai_asrama` (
    `id_lantai` INTEGER NOT NULL AUTO_INCREMENT,
    `lantai` INTEGER NOT NULL,
    `harga_lantai` INTEGER NOT NULL,

    PRIMARY KEY (`id_lantai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mahasiswa` ADD CONSTRAINT `Mahasiswa_id_prodi_fkey` FOREIGN KEY (`id_prodi`) REFERENCES `Prodi`(`id_prodi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mahasiswa` ADD CONSTRAINT `Mahasiswa_id_tahun_ajaran_fkey` FOREIGN KEY (`id_tahun_ajaran`) REFERENCES `tahun_ajaran_mahasiswa`(`id_tahun_ajaran`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mahasiswa` ADD CONSTRAINT `Mahasiswa_id_fakultas_fkey` FOREIGN KEY (`id_fakultas`) REFERENCES `Fakultas`(`id_fakultas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `Role`(`id_role`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prodi` ADD CONSTRAINT `Prodi_id_fakultas_fkey` FOREIGN KEY (`id_fakultas`) REFERENCES `Fakultas`(`id_fakultas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fasilitas` ADD CONSTRAINT `Fasilitas_id_jenis_fasilitas_fkey` FOREIGN KEY (`id_jenis_fasilitas`) REFERENCES `jenis_fasilitas`(`id_jenis_fasilitas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kamar_asrama` ADD CONSTRAINT `kamar_asrama_id_lantai_fkey` FOREIGN KEY (`id_lantai`) REFERENCES `lantai_asrama`(`id_lantai`) ON DELETE RESTRICT ON UPDATE CASCADE;
