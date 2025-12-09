import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/userProfileController.js";

const router = express.Router();

// /api/userProfile/
router.get("/", protect, getUserProfile);

router.put("/", protect, updateUserProfile);

export default router;
