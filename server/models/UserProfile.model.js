import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAuth",
      required: true,
      unique: true
    },

    fullName: { type: String, required: true },

    gender: { type: String, enum: ["male", "female", "other"], required: true },

    dob: { type: Date, required: true },

    age: { type: Number }, // calculated from dob automatically

    gotra: { type: String },

    rashi: { type: String },

    nakshatra: { type: String },

    mobileNumber: { type: String },

    email: { type: String, required: true },

    avatar: {
      type: String,
      default: "https://img.icons8.com/color/512/bhagva.png"
    }
  },
  { timestamps: true }
);

// Pre-save hook to calculate age automatically
UserProfileSchema.pre("save", function (next) {
  if (this.dob) {
    const diff = Date.now() - this.dob.getTime();
    this.age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }
  next();
});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
export default UserProfile;
