import APOD from "../models/APOD.js";
import { getAstronomyPictureOfTheDay } from "../services/apiService.js";
import { getRandomDate } from "../utils/helps.js";
import { saveApodsToDB } from "../repositories/nasaRepository.js";

// 미들웨어: 데이터 확인 및 처리
export const checkImageMiddleware = async (req, res, next) => {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0)); // 오늘 00:00:00
    const endOfToday = new Date(today.setHours(23, 59, 59, 999)); // 오늘 23:59:59
  
    try {
      // 1. 데이터베이스에서 createdAt 기준으로 데이터 검색
      const existingImage = await APOD.findOne({
        createdAt: { $gte: startOfToday, $lte: endOfToday }, // 오늘의 데이터 검색
      });
  
      if (existingImage) {
        // 데이터가 있으면 요청 객체에 저장하고 다음 핸들러로 이동
        req.imageData = existingImage;
        return next();
      }
  
      // 2. 데이터베이스에 데이터가 없을 경우, 외부 API 호출 및 저장
      const data = await getAstronomyPictureOfTheDay();
      await saveApodsToDB(data);
  
      // 데이터 저장 후 다음 핸들러로 이동
      const savedImage = await APOD.findOne({
        createdAt: { $gte: startOfToday, $lte: endOfToday },
      });
  
      req.imageData = savedImage;
      next();
    } catch (error) {
      console.error("미들웨어 처리 중 오류:", error.message);
      res.status(500).json({ error: "이미지 처리 중 문제가 발생했습니다." });
    }
  };


