const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/generateToken");
const { sendEmail } = require("../utils/sendEmail");

exports.register = asyncHandler(
  async ({ name, email, password, passwordConfirmation }) => {
    if (password !== passwordConfirmation) {
      throw new Error("Password dan konfirmasi password tidak cocok");
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email sudah terdaftar");
    }

    const user = await User.create({ name, email, password });

    const token = generateAccessToken({ id: user.id, email: user.email });

    const verifyUrl = `${process.env.APP_URL}/api/auth/verify-email?token=${token}`;
    console.log(`Verifikasi email: ${verifyUrl}`);

    await sendEmail({
      to: user.email,
      subject: "Verifikasi Email Anda",
      text: `Klik link berikut untuk verifikasi email Anda: ${verifyUrl}`,
      html: `<p>Klik link berikut untuk verifikasi email Anda:</p><a href="${verifyUrl}">${verifyUrl}</a>`,
    });

    return user;
  }
);

exports.login = asyncHandler(async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Email atau password salah");
  }
  if (!user.emailVerifiedAt) {
    throw new Error("Email belum diverifikasi");
  }
  const accessToken = generateAccessToken({ id: user.id, email: user.email });
  const refreshToken = generateRefreshToken(user.id);

  return { user, accessToken, refreshToken };
});

exports.logout = asyncHandler(async (user) => {
  res.clearCookie("token");
  return;
});

exports.verifyEmail = asyncHandler(async (token) => {
  const decoded = verifyAccessToken(token);

  if (!decoded) {
    throw new Error("Token tidak valid");
  }

  const user = await User.findByPk(decoded.id);
  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  user.emailVerifiedAt = new Date();
  await user.save();

  return user;
});

exports.forgotPassword = asyncHandler(async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Email tidak ditemukan");
  }

  const token = generateAccessToken({ id: user.id, email: user.email });
  const resetUrl = `${process.env.APP_URL}/api/auth/reset-password?token=${token}`;
  console.log(`Reset password: ${resetUrl}`);

  await sendEmail({
    to: user.email,
    subject: "Reset Password Anda",
    text: `Klik link berikut untuk mereset password Anda: ${resetUrl}`,
    html: `<p>Klik link berikut untuk mereset password Anda:</p><a href="${resetUrl}">${resetUrl}</a>`,
  });

  return;
});

exports.resetPassword = asyncHandler(
  async (token, newPassword, newPasswordConfirmation) => {
    if (newPassword !== newPasswordConfirmation) {
      throw new Error("Password dan konfirmasi password tidak cocok");
    }
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      throw new Error("Token tidak valid");
    }
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error("User tidak ditemukan");
    }
    user.password = newPassword;
    await user.save();
    return user;
  }
);

exports.refreshToken = asyncHandler(async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    throw new Error("Refresh token tidak valid");
  }

  const user = await User.findByPk(decoded.userId);
  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  const newAccessToken = generateAccessToken({
    id: user.id,
    email: user.email,
  });
  const newRefreshToken = generateRefreshToken(user.id);

  return { user, accessToken: newAccessToken, refreshToken: newRefreshToken };
});
