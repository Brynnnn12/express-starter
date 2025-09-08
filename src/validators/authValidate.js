const { body, validationResult } = require("express-validator");

exports.validateRegistration = [
  body("name")
    .notEmpty()
    .withMessage("Nama harus diisi")
    .isLength({ min: 3 })
    .withMessage("Nama harus memiliki minimal 3 karakter"),
  body("email")
    .notEmpty()
    .withMessage("Email harus diisi")
    .isEmail()
    .withMessage("Email tidak valid"),
  body("password")
    .notEmpty()
    .withMessage("Password harus diisi")
    .isLength({ min: 6 })
    .withMessage("Password harus memiliki minimal 6 karakter"),
  body("passwordConfirmation")
    .notEmpty()
    .withMessage("Konfirmasi password harus diisi")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password dan konfirmasi password tidak cocok"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email harus diisi")
    .isEmail()
    .withMessage("Email tidak valid"),
  body("password").notEmpty().withMessage("Password harus diisi"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateForgotPassword = [
  body("email")
    .notEmpty()
    .withMessage("Email harus diisi")
    .isEmail()
    .withMessage("Email tidak valid"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateResetPassword = [
  body("password")
    .notEmpty()
    .withMessage("Password harus diisi")
    .isLength({ min: 6 })
    .withMessage("Password harus memiliki minimal 6 karakter"),
  body("passwordConfirmation")
    .notEmpty()
    .withMessage("Konfirmasi password harus diisi")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password dan konfirmasi password tidak cocok"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateRefreshToken = [
  body("refreshToken").notEmpty().withMessage("Refresh token harus diisi"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
