import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getMyOrders,
  createOrder,
  getOrderById,
  cancelOrderById,
} from "../controllers/ordersControllers.js";
const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.post("/:id", protect, cancelOrderById);
export default router;
