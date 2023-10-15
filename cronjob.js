const cron = require("node-cron");
const m$booking = require("../api-reservasi-upn/modules/booking.module");
const m$asrama = require("../api-reservasi-upn/modules/kamar.module");

// Definisikan tugas cron
const tugasCronMenit = () => {
    console.log("Cron job Menitan dijalankan pada: ", new Date());
    m$booking.deleteBookingCronJob();
    m$asrama.deleteExpiredMahasiswaCronJob();
};

const tugasCronDay = () => {
    console.log("Cron job Harian dijalankan pada: ", new Date());
};

// Ekspresi cron untuk menjalankan setiap menit
const jadwalCronMenit = "* * * * *";
const jadwalCronDay = "0 0 * * *";

// Jalankan cron job
cron.schedule(jadwalCronMenit, tugasCronMenit);
cron.schedule(jadwalCronDay, tugasCronDay);

module.exports = { tugasCronMenit, tugasCronDay }; // Export tugasCron untuk digunakan di file lain jika diperlukan
