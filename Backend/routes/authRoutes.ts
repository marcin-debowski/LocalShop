// routes/authRoutes.ts
import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/authController";
import { verifyToken } from "../Middleware/auth";
import { getCurrentUser } from "../controllers/authController";
import { addProduct } from "../controllers/productController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getCurrentUser);
router.post("/logout", logoutUser);



export default router;
