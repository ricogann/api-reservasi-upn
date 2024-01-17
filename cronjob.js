const cron = require("node-cron");
const m$booking = require("../api-reservasi-upn/modules/booking.module");
const m$asrama = require("../api-reservasi-upn/modules/kamar.module");

// Definisikan tugas cron
const tugasCronMenit = () => {
    console.log("Cron job Menitan dijalankan pada: ", new Date());
    m$booking.deleteBookingCronJob();
};

const tugasCronDay = () => {
    console.log("Cron job Harian dijalankan pada: ", new Date());
};

const tugasCron25July = () => {
    console.log("Cron job Harian dijalankan pada 25 July: ", new Date());
    //To Do Tambahkan Function Untuk Add Data Pemesanan Asrama (History) + Delete All Mahasiswa Kamar -> Menjadi Status Kamar Semua menjadi False
    m$asrama.July25ChangeStatusKamarCronJob();
};

// Ekspresi cron untuk menjalankan setiap menit
const jadwalCronMenit = "* * * * *";
const jadwalCronDay = "0 0 * * *";
const jadwalCron25July = "0 0 25 7 *";

// Jalankan cron job
cron.schedule(jadwalCronMenit, tugasCronMenit);
cron.schedule(jadwalCronDay, tugasCronDay);
cron.schedule(jadwalCron25July, tugasCron25July);

module.exports = { tugasCronMenit, tugasCronDay, tugasCron25July }; // Export tugasCron untuk digunakan di file lain jika diperlukan
