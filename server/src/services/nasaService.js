import axios from 'axios';
import 'dotenv/config'

const NASA_BASE_URL = 'https://api.nasa.gov';
const NASA_API_KEY =  process.env.NASA_API_KEY

// NASA API 예시 함수: Astronomy Picture of the Day (APOD)
export const getAstronomyPictureOfTheDay = async () => {
    console.log(NASA_API_KEY);
  try {
    const response = await axios.get(`${NASA_BASE_URL}/planetary/apod`, {
      params: {
        api_key: NASA_API_KEY
      }
    });
    return response.data; // 데이터를 반환
  } catch (error) {
    console.error('NASA API 호출 에러:', error.message);
    throw error;
  }
};