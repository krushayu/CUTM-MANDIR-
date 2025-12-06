import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import connectDB from "./config/db.js";  
import profileRoutes from "./routes/profile.routes.js";
import donationRoutes from "./routes/donation.routes.js";
import mantraRoutes from "./routes/mantras.routes.js";

dotenv.config(); // MUST BE FIRST

const app = express();

// Core Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Cloudinary Check (after dotenv)
// console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API KEY:", process.env.CLOUDINARY_API_KEY);

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
  console.error("❌ Cloudinary config missing. Fix .env file.");
} else {
  console.log("☁️ Cloudinary Connected");
}

// Test route
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API is working!' });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/mantras", mantraRoutes);

// Start Server AFTER DB Connect
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err.message);
  });
