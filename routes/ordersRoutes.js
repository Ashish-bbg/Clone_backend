import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getMyOrders,
  createOrder,
  getOrderById,
} from "../controllers/ordersControllers.js";
const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
export default router;
