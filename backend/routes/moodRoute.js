import express from 'express';
import { submitMood } from '../controllers/moodController.js';
import { verifyToken } from '../utils/verifyUser.js';  // assuming you use token verification

const router = express.Router();

router.post('/submit', verifyToken, submitMood);

export default router;