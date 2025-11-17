import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createAddress,
  getAllAddress,
} from "../controllers/addressControllers.js";

const router = express.Router();

// @route /api/address
router.get("/", protect, getAllAddress);
router.post("/", protect, createAddress);
// route.put("/", protect, "");
// route.delete("/", protect, "");

export default router;
