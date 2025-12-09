import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUserProfile } from "../controllers/userProfileController.js";

const router = express.Router();

// /api/userProfile/
router.get("/", protect, getUserProfile);

export default router;
