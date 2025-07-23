// routes/productRoutes.ts
import express from "express";
import { addProduct, getAllProducts } from "../controllers/productController";
import { verifyToken } from "../Middleware/auth";
import { rootCertificates } from "tls";

const router = express.Router();

router.post("/add", verifyToken, addProduct);
router.get("/all", getAllProducts);

export default router;
