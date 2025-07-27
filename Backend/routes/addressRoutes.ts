// routes/productRoutes.ts
import express from "express";

import { verifyToken } from "../Middleware/auth";
import { AddAddress, GetAddress, } from "../controllers/addressController";


const router = express.Router();

router.post("/add", verifyToken, AddAddress);
router.get("/get", verifyToken, GetAddress);


export default router;
