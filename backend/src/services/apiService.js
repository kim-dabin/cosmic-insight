import axios from "axios";

const NASA_BASE_URL = 'https://api.nasa.gov';
const OPEN_WEATHER_URL = 'https://api.openweathermap.org'
const NASA_API_KEY =  process.env.NASA_API_KEY;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

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

// Mars Weather Data를 가져온다
export const getInsightWeatherData = async () => {
  try {
    const response = await axios.get(`${NASA_BASE_URL}/insight_weather/`, {
      params: {
        api_key: NASA_API_KEY,
        feedtype: 'json',
        ver: '1.0'
      }
    });
    return response.data; // 데이터를 반환
  } catch (error) {
    console.error('NASA Insight_weather API 호출 에러:', error.message);
    throw error;
  }
};

export const getLocationWeatherData = async (latitude, longitude) => {
    try {
        const response = await axios.get(`${OPEN_WEATHER_URL}/data/2.5/weather`, {
            params: {
                appid: OPENWEATHER_API_KEY,
                lat: latitude,
                lon: longitude,
                units: 'metric',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Open Weather API 호출 에러:', error.message);
        throw error;
    }
};