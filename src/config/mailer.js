const nodemailer = require("nodemailer");

// Buat transporter hanya jika kredensial email tersedia
const createTransporter = () => {
  // Jika tidak ada konfigurasi email, return null
  if (!process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.gmail.com",
    port: process.env.MAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
};

module.exports = createTransporter();
