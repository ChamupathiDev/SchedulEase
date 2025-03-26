// backend/routes/MoodRoutes.js
import { Router } from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { analyzeMood } from "../controllers/mood.controller.js";

const router = Router();

router.post("/analyze", verifyToken, analyzeMood);

export default router;

