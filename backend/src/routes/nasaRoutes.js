import express from 'express';
import { getApodImage } from '../controllers/nasaController.js';
import { checkImageMiddleware } from '../middleware/checkImage.js';

const router = express.Router();

router.get('/apod', checkImageMiddleware, getApodImage);

export default router;