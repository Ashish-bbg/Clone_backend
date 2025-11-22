import express from "express";
import { protect } from "../middleware/authMiddleware";
import { createRazorpayOrder } from "../controllers/paymentController";

const router = express.Router();

router.post("/create-order", protect, createRazorpayOrder);

export default router;
