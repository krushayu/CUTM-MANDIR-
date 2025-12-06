import express from "express";
import Donation from "../models/Donation.model.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { upload, uploadToCloudinary } from "../config/cloudinary.js";

const router = express.Router();

// Create donation
router.post("/", verifyToken, upload.single("screenshot"), async (req, res) => {
  try {
    const { amount, purpose, donorName, donorEmail, transactionId } = req.body;

    if (!amount || !purpose || !donorName || !donorEmail || !transactionId || !req.file) {
      return res.status(400).json({ message: "All fields including screenshot are required" });
    }

    // Upload image to Cloudinary
    const filename = `donation_${Date.now()}_${req.user.id}`;
    const cloudinaryResult = await uploadToCloudinary(req.file.buffer, filename);

    // Save in MongoDB
    const donation = await Donation.create({
      amount,
      purpose,
      donorName,
      donorEmail,
      transactionId,
      screenshot: cloudinaryResult.secure_url,
      userId: req.user.id
    });

    // Send to WhatsApp
    await sendToWhatsApp(donation);

    res.status(201).json({
      message: "Donation submitted successfully",
      data: donation
    });

  } catch (error) {
    console.error("Donation error:", error);
    res.status(500).json({ message: "Failed to create donation", error });
  }
});

// Get user donation history
router.get("/user/history", verifyToken, async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .select('donationId amount purpose status receiptNumber createdAt');

    res.json({ donations });
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ message: "Failed to get donation history" });
  }
});

// WhatsApp forward (dummy)
async function sendToWhatsApp(donation) {
  try {
    const whatsappNumber = process.env.WHATSAPP_NUMBER;

    const msg = `
🕉️ New Donation Received

Amount: ₹${donation.amount}
Purpose: ${donation.purpose}
Donor: ${donation.donorName}
Email: ${donation.donorEmail}
Transaction ID: ${donation.transactionId}
Screenshot: ${donation.screenshot}

Please verify payment.
    `.trim();

    // Real API logic yaha aayega
    console.log(`WhatsApp Message Sent To ${whatsappNumber}:\n${msg}`);

    donation.whatsappSent = true;
    await donation.save();

  } catch (error) {
    console.error("WhatsApp Error:", error);
  }
}

export default router;
