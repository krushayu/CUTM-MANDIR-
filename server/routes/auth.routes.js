import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { verifyToken, checkRole } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.post("/register", registerUser);
router.post("/login", loginUser);

// Authenticated
router.get("/me", verifyToken, (req, res) => {
  res.json({ message: "Authenticated", user: req.user });
});

// Role-protected examples
router.get("/admin", verifyToken, checkRole("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get("/priest", verifyToken, checkRole("priest"), (req, res) => {
  res.json({ message: "Welcome Priest!" });
});

router.get("/devotee", verifyToken, checkRole("devotee"), (req, res) => {
  res.json({ message: "Welcome Devotee!" });
});

export default router;
