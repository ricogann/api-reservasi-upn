-- CreateTable
CREATE TABLE `Mahasiswa` (
    `id_mahasiswa` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_mahasiswa` VARCHAR(191) NOT NULL,
    `npm_mahasiswa` VARCHAR(191) NOT NULL,
    `password_mahasiswa` VARCHAR(191) NOT NULL,
    `tahun_ajaran_mahasiswa` INTEGER NOT NULL,
    `fakultas_mahasiswa` VARCHAR(191) NOT NULL,
    `jurusan_mahasiswa` VARCHAR(191) NOT NULL,
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
    `role` VARCHAR(191) NOT NULL,
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
    `tahun_ajaran` INTEGER NOT NULL,

    PRIMARY KEY (`id_tahun_ajaran`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id_role` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
