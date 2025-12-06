import mongoose from "mongoose";

const allowedDomains = [
  "gmail.com",
  "cutm.ac.in",
  "centurionuniv.edu.in",
  "zohomail.in"
];

const UserAuthSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (email) => {
          const domain = email.split("@")[1];
          return allowedDomains.includes(domain);
        },
        message: "Email domain not allowed",
      },
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "priest", "devotee"],
      default: "devotee",
      required: true,
    }
  },
  { timestamps: true }
);

const UserAuth = mongoose.model("UserAuth", UserAuthSchema);
export default UserAuth;