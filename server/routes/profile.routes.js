import express from "express";
import { getProfile, upsertProfile } from "../controllers/profile.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Middleware to handle validation results
const validateProfile = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET profile
router.get("/", verifyToken, getProfile);

// POST / update profile with validation
router.post(
  "/",
  verifyToken,
  [
    body("fullName")
      .trim()
      .notEmpty()
      .withMessage("Full name is required"),
    body("dob")
      .notEmpty()
      .withMessage("Date of birth is required")
      .isDate()
      .withMessage("Date of birth must be a valid date"),
    body("gender")
      .notEmpty()
      .withMessage("Gender is required")
      .isIn(["male", "female", "other"])
      .withMessage("Gender must be male, female, or other"),
    body("mobileNumber")
      .optional()
      .isMobilePhone()
      .withMessage("Mobile number is invalid"),
    body("gotra").optional().trim().escape(),
    body("rashi").optional().trim().escape(),
    body("nakshatra").optional().trim().escape()
  ],
  validateProfile,
  upsertProfile
);

export default router;
