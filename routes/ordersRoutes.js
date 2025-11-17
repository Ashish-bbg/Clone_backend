import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMyOrders, createOrder } from "../controllers/ordersControllers.js";
const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
export default router;
