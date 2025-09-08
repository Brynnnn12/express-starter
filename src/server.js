// Load environment variables
require("dotenv").config();

// Core dependencies
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

// Routes
const authRoute = require("./routes/authRoute");

// Middlewares
const { notFound, errorHandler } = require("./middlewares/errorHandler");

// Initialize app
const app = express();

// Environment variables
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors());

// Logging middleware
app.use(morgan("combined"));

// Untuk parsing middleware dan body request yang besar ukuran 10mb
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Express Starter API is running!",
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/auth", authRoute);

// Handle 404 errors
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT} in ${NODE_ENV} mode`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
});
