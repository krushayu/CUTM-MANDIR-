import UserProfile from "../models/UserProfile.model.js";
import cloudinary from "../config/cloudinary.js";

export const upsertProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const body = req.body;

    // Email always from auth
    body.email = req.user.email;

    let imageUrl = null;

    // If user uploaded a new file
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "profiles",
      });
      imageUrl = upload.secure_url;
      body.profileImage = imageUrl;
    }

    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      body,
      { new: true, upsert: true }
    );

    // --- WhatsApp Redirect Message ---
    const message = `
✨ *New Profile Verification Request* ✨

Name: ${profile.fullName}
Email: ${profile.email}
Phone: ${profile.phone}
Address: ${profile.address}
City: ${profile.city}
State: ${profile.state}

Photo URL: ${profile.profileImage || "No Image Uploaded"}
    `;

    const encodedMsg = encodeURIComponent(message.trim());
    const waNumber = "YOUR_WHATSAPP_NUMBER"; // ← Tum apna yahan lagana

    const redirectUrl = `https://wa.me/${waNumber}?text=${encodedMsg}`;

    return res.status(200).json({
      success: true,
      message: "Profile saved successfully!",
      profile,
      redirectUrl,
    });

  } catch (err) {
    console.error("Profile Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await UserProfile.findOne({ userId });

    if (!profile)
      return res.status(404).json({ message: "Profile not found" });

    res.status(200).json({ profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
