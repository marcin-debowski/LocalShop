// routes/authRoutes.ts
import express from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { verifyToken } from "../Middleware/auth";
import { User } from "../models/User";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user?.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Wylogowano" });
});

export default router;
