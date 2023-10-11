const cron = require('node-cron');
const m$booking = require("../api-reservasi-upn/modules/booking.module");

// Definisikan tugas cron
const tugasCron = () => {

  console.log('Cron job dijalankan pada: ', new Date());
    m$booking.deleteBookingCronJob();
};


// Ekspresi cron untuk menjalankan setiap menit
const jadwalCron = '* * * * *';

// Jalankan cron job
cron.schedule(jadwalCron, tugasCron);

module.exports = { tugasCron }; // Export tugasCron untuk digunakan di file lain jika diperlukan
