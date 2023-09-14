-- CreateTable
CREATE TABLE `Account` (
    `id_account` INTEGER NOT NULL AUTO_INCREMENT,
    `id_role` INTEGER NOT NULL,
    `status_account` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_account`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mahasiswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_account` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `npm` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `id_tahun_ajaran` INTEGER NOT NULL,
    `id_fakultas` INTEGER NOT NULL,
    `id_prodi` INTEGER NOT NULL,
    `no_telp` VARCHAR(191) NOT NULL,
    `bukti_identitas` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Mahasiswa_npm_key`(`npm`),
    UNIQUE INDEX `Mahasiswa_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Umum` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_account` INTEGER NOT NULL,
    `NIK` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `no_telp` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `bukti_identitas` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Umum_NIK_key`(`NIK`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dosen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_account` INTEGER NOT NULL,
    `NIP` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `no_telp` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `bukti_identitas` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Dosen_id_account_key`(`id_account`),
    UNIQUE INDEX `Dosen_NIP_key`(`NIP`),
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
CREATE TABLE `tahun_ajaran` (
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
CREATE TABLE `Admin` (
    `id_admin` INTEGER NOT NULL AUTO_INCREMENT,
    `username_admin` VARCHAR(191) NOT NULL,
    `password_admin` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fasilitas` (
    `id_fasilitas` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,
    `jam_buka` VARCHAR(191) NOT NULL,
    `jam_tutup` VARCHAR(191) NOT NULL,
    `buka_hari` VARCHAR(191) NOT NULL,
    `durasi` INTEGER NOT NULL,

    PRIMARY KEY (`id_fasilitas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Harga` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_fasilitas` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `harga` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kamar_asrama` (
    `id_asrama` INTEGER NOT NULL AUTO_INCREMENT,
    `id` INTEGER NOT NULL,
    `no_kamar` INTEGER NOT NULL,
    `npm_bed1_a` VARCHAR(191) NULL,
    `npm_bed2_b` VARCHAR(191) NULL,
    `npm_bed3_c` VARCHAR(191) NULL,
    `status_kamar` BOOLEAN NOT NULL,

    PRIMARY KEY (`id_asrama`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pemesanan` (
    `id_pemesanan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_fasilitas` INTEGER NOT NULL,
    `id_harga` INTEGER NOT NULL,
    `id_account` INTEGER NOT NULL,
    `tanggal_pemesanan` DATETIME(3) NOT NULL,
    `jam_checkin` VARCHAR(191) NULL,
    `jam_checkout` VARCHAR(191) NULL,
    `durasi` INTEGER NULL,
    `total_harga` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `bukti_pembayaran` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_pemesanan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `Role`(`id_role`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mahasiswa` ADD CONSTRAINT `Mahasiswa_id_prodi_fkey` FOREIGN KEY (`id_prodi`) REFERENCES `Prodi`(`id_prodi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mahasiswa` ADD CONSTRAINT `Mahasiswa_id_tahun_ajaran_fkey` FOREIGN KEY (`id_tahun_ajaran`) REFERENCES `tahun_ajaran`(`id_tahun_ajaran`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mahasiswa` ADD CONSTRAINT `Mahasiswa_id_fakultas_fkey` FOREIGN KEY (`id_fakultas`) REFERENCES `Fakultas`(`id_fakultas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mahasiswa` ADD CONSTRAINT `Mahasiswa_id_account_fkey` FOREIGN KEY (`id_account`) REFERENCES `Account`(`id_account`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Umum` ADD CONSTRAINT `Umum_id_account_fkey` FOREIGN KEY (`id_account`) REFERENCES `Account`(`id_account`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dosen` ADD CONSTRAINT `Dosen_id_account_fkey` FOREIGN KEY (`id_account`) REFERENCES `Account`(`id_account`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prodi` ADD CONSTRAINT `Prodi_id_fakultas_fkey` FOREIGN KEY (`id_fakultas`) REFERENCES `Fakultas`(`id_fakultas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Harga` ADD CONSTRAINT `Harga_id_fasilitas_fkey` FOREIGN KEY (`id_fasilitas`) REFERENCES `Fasilitas`(`id_fasilitas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kamar_asrama` ADD CONSTRAINT `kamar_asrama_id_fkey` FOREIGN KEY (`id`) REFERENCES `Harga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pemesanan` ADD CONSTRAINT `Pemesanan_id_account_fkey` FOREIGN KEY (`id_account`) REFERENCES `Account`(`id_account`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pemesanan` ADD CONSTRAINT `Pemesanan_id_fasilitas_fkey` FOREIGN KEY (`id_fasilitas`) REFERENCES `Fasilitas`(`id_fasilitas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pemesanan` ADD CONSTRAINT `Pemesanan_id_harga_fkey` FOREIGN KEY (`id_harga`) REFERENCES `Harga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
