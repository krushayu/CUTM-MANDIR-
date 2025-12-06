import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    donationId: {
      type: String,
      unique: true,
      default: function() {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `DON${timestamp.slice(-6)}${random}`;
      }
    },
    amount: { type: Number, required: true, min: 1 },
    purpose: {
      type: String,
      required: true,
      enum: [
        "general","annadanam","maintenance","education","construction",
        "brahmotsav","diwali","holi","janmashtami","shivaratri",
        "navaratri","ganesh_chaturthi","ram_navami","hanuman_jayanti",
        "karva_chauth","dussehra","govardhan_puja","akshaya_tritiya",
        "special_pooja","abhishekam","aarti","prasadam","decoration",
        "lighting","sound_system","security","cleaning","other"
      ]
    },
    donorName: { type: String, required: true },
    donorEmail: { type: String, required: true },
    transactionId: { type: String, required: true },
    screenshot: { type: String, required: true }, // Cloudinary URL
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending"
    },
    whatsappSent: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserAuth", required: true }
  },
  { timestamps: true }
);

const Donation = mongoose.model("Donation", DonationSchema);
export default Donation;
