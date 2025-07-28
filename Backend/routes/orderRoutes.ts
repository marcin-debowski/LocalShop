// routes/productRoutes.ts
import express from "express";
import { addOrder } from "../controllers/orderController";
import { optionalVerifyToken, verifyToken } from "../Middleware/auth";



const router = express.Router();

router.post("/add", optionalVerifyToken, addOrder);


export default router;
