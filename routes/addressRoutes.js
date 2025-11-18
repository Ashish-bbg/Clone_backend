import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createAddress,
  deleteAddress,
  getAllAddress,
  updateAddress,
} from "../controllers/addressControllers.js";

const router = express.Router();

// @route /api/address
router.get("/", protect, getAllAddress);
router.post("/", protect, createAddress);
router.put("/:id", protect, updateAddress);
router.delete("/:id", protect, deleteAddress);

export default router;
