import axios from "axios";
import APOD from "../models/APOD.js";

const NASA_BASE_URL = 'https://api.nasa.gov';
const NASA_API_KEY =  process.env.NASA_API_KEY

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
      await insertApods(data);
  
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

// NASA API 예시 함수: Astronomy Picture of the Day (APOD)
export const getAstronomyPictureOfTheDay = async () => {
    // console.log(NASA_API_KEY);
  try {
    // const randomDate = getRandomDate();
    const response = await axios.get(`${NASA_BASE_URL}/planetary/apod`, {
      params: {
        api_key: NASA_API_KEY,
        // date: randomDate
        count: 10,  // 랜덤 이미지 10개
      }
    });
    return response.data; // 데이터를 반환
  } catch (error) {
    console.error('NASA API 호출 에러:', error.message);
    throw error;
  }
};

// 데이터베이스에 APOD 데이터 저장
export const insertApods = async (data) => {
    if (!Array.isArray(data)) {
        throw new Error("데이터 형식이 잘못되었습니다. 배열이어야 합니다.");
      }
    
    try {
      const result = await APOD.insertMany(data);
      console.log('데이터가 성공적으로 저장되었습니다:', result);
    } catch (error) {
      console.error('데이터 저장 중 오류가 발생했습니다:', error);
    }
  }


// 날짜를 랜덤하게 생성하는 함수
function getRandomDate() {
    // NASA APOD는 1995년 6월 16일부터 데이터 제공
    const startDate = new Date(1995, 5, 16); // 월은 0부터 시작 (6월 = 5)
    const endDate = new Date();
    const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    const randomDate = new Date(randomTime);
  
    // 날짜 포맷을 'YYYY-MM-DD' 형식으로 변환
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, '0'); // 월을 2자리로 맞춤
    const day = String(randomDate.getDate()).padStart(2, '0'); // 일을 2자리로 맞춤
    return `${year}-${month}-${day}`;
  }