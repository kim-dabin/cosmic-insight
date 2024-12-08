import express from 'express';
import { getApodImage, loadMarsWeather2DB } from '../controllers/nasaController.js';
import { checkImageMiddleware } from '../middleware/checkImage.js';

const router = express.Router();
router.get('/apod', checkImageMiddleware, getApodImage);
router.get('/mars-weather', loadMarsWeather2DB);
// router.get('/weather', );

export default router;