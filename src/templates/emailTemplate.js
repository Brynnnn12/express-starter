/**
 * Template email HTML modern dan responsif
 * @param {Object} options
 * @param {string} options.title - Judul email
 * @param {string} options.heading - Heading utama
 * @param {string} options.message - Pesan utama
 * @param {string} [options.buttonText] - Text untuk button
 * @param {string} [options.buttonUrl] - URL untuk button
 * @param {string} [options.footerText] - Text untuk footer
 * @param {string} [options.companyName] - Nama company
 * @returns {string} HTML template
 */
exports.createEmailTemplate = ({
  title,
  heading,
  message,
  buttonText,
  buttonUrl,
  footerText = "Jika Anda tidak melakukan permintaan ini, abaikan email ini.",
  companyName = "Express Starter App",
}) => {
  return `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        /* Reset styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .header .company-name {
            font-size: 14px;
            opacity: 0.9;
            font-weight: 400;
        }
        
        .content {
            padding: 40px 30px;
            background-color: #ffffff;
        }
        
        .content h2 {
            font-size: 24px;
            color: #2d3748;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .message {
            font-size: 16px;
            color: #4a5568;
            margin-bottom: 30px;
            line-height: 1.7;
        }
        
        .button-container {
            text-align: center;
            margin: 35px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            padding: 14px 30px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
            margin: 30px 0;
        }
        
        .info-box {
            background-color: #f7fafc;
            border-left: 4px solid #4299e1;
            padding: 15px 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .info-box p {
            margin: 0;
            font-size: 14px;
            color: #2d3748;
        }
        
        .footer {
            background-color: #f7fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer p {
            font-size: 14px;
            color: #718096;
            margin-bottom: 10px;
        }
        
        .footer .security-notice {
            background-color: #fff5f5;
            border: 1px solid #feb2b2;
            color: #c53030;
            padding: 12px;
            border-radius: 6px;
            margin-top: 20px;
            font-size: 13px;
        }
        
        .social-links {
            margin-top: 20px;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #718096;
            text-decoration: none;
            font-size: 12px;
        }
        
        /* Responsive styles */
        @media screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                width: 100% !important;
            }
            
            .header, .content, .footer {
                padding: 25px 20px !important;
            }
            
            .header h1 {
                font-size: 24px !important;
            }
            
            .content h2 {
                font-size: 20px !important;
            }
            
            .cta-button {
                padding: 12px 25px !important;
                font-size: 15px !important;
                width: 100%;
                max-width: 280px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>🚀 ${heading}</h1>
            <div class="company-name">${companyName}</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="message">
                ${message}
            </div>
            
            ${
              buttonText && buttonUrl
                ? `
            <div class="button-container">
                <a href="${buttonUrl}" class="cta-button">${buttonText}</a>
            </div>
            `
                : ""
            }
            
            <div class="divider"></div>
            
            <div class="info-box">
                <p><strong>💡 Catatan:</strong> Link ini akan kedaluwarsa dalam 1 jam untuk keamanan akun Anda.</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p>Email ini dikirim otomatis dari sistem ${companyName}.</p>
            <p>${footerText}</p>
            
            <div class="security-notice">
                <strong>⚠️ Keamanan:</strong> Jangan bagikan link atau informasi dalam email ini kepada siapapun.
            </div>
            
            <div class="social-links">
                <a href="#">Bantuan</a> |
                <a href="#">Kebijakan Privasi</a> |
                <a href="#">Kontak</a>
            </div>
            
            <p style="margin-top: 20px; font-size: 12px; color: #a0aec0;">
                © ${new Date().getFullYear()} ${companyName}. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>`;
};

/**
 * Template khusus untuk verifikasi email
 */
exports.createVerificationEmailTemplate = ({ userName, verificationUrl }) => {
  return exports.createEmailTemplate({
    title: "Verifikasi Email Anda",
    heading: "Verifikasi Email",
    message: `
      <p>Halo <strong>${userName}</strong>,</p>
      <p>Terima kasih telah mendaftar! Untuk menyelesaikan proses registrasi, silakan verifikasi alamat email Anda dengan mengklik tombol di bawah ini:</p>
    `,
    buttonText: "Verifikasi Email Saya",
    buttonUrl: verificationUrl,
    footerText: "Jika Anda tidak mendaftar untuk akun ini, abaikan email ini.",
  });
};

/**
 * Template khusus untuk reset password
 */
exports.createPasswordResetTemplate = ({ userName, resetUrl }) => {
  return exports.createEmailTemplate({
    title: "Reset Password Anda",
    heading: "Reset Password",
    message: `
      <p>Halo <strong>${userName}</strong>,</p>
      <p>Kami menerima permintaan untuk mereset password akun Anda. Klik tombol di bawah ini untuk membuat password baru:</p>
    `,
    buttonText: "Reset Password Saya",
    buttonUrl: resetUrl,
    footerText:
      "Jika Anda tidak meminta reset password, abaikan email ini dan password Anda tidak akan berubah.",
  });
};

/**
 * Template khusus untuk welcome email
 */
exports.createWelcomeEmailTemplate = ({ userName, dashboardUrl }) => {
  return exports.createEmailTemplate({
    title: "Selamat Datang!",
    heading: "Selamat Datang!",
    message: `
      <p>Halo <strong>${userName}</strong>,</p>
      <p>Selamat datang di Express Starter App! Email Anda telah berhasil diverifikasi dan akun Anda sudah aktif.</p>
      <p>Anda sekarang dapat mulai menggunakan semua fitur yang tersedia.</p>
    `,
    buttonText: "Mulai Sekarang",
    buttonUrl: dashboardUrl || "#",
    footerText:
      "Jika Anda membutuhkan bantuan, jangan ragu untuk menghubungi tim support kami.",
  });
};
