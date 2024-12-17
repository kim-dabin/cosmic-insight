import express from 'express';
import { getApodImage, loadMarsWeather2DB, getWeather } from '../controllers/nasaController.js';
import { checkImageMiddleware } from '../middleware/checkImage.js';

const router = express.Router();
router.get('/apod', checkImageMiddleware, getApodImage);
router.get('/load/mars-weather', loadMarsWeather2DB);
router.post('/insight/weather', getWeather);
// router.get('/weather', );

export default router;