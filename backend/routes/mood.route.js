
import express from 'express';
import { submitMood } from '../controllers/mood.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/submit', verifyToken, submitMood);

export default router;
