// routes/productRoutes.ts
import express from "express";
import { addOrder, getOrders } from "../controllers/orderController";
import { optionalVerifyToken, verifyToken } from "../Middleware/auth";



const router = express.Router();

router.post("/add", optionalVerifyToken, addOrder);
router.get("/all", verifyToken, getOrders);

export default router;
