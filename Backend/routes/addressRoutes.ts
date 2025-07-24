// routes/productRoutes.ts
import express from "express";

import { verifyToken } from "../Middleware/auth";
import { AddAddress } from "../controllers/addressController";


const router = express.Router();

router.post("/add", verifyToken, AddAddress);


export default router;
