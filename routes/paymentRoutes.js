import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createRazorpayOrder } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", protect, createRazorpayOrder);

export default router;
