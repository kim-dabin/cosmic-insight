import { getRandomImage, getMarsData2Mongo } from '../services/nasaService.js';
import { getInsightWeatherData } from '../services/apiService.js';

export const getApodImage = async (req, res) => {
  try {
    const data = await getRandomImage();
    res.json(data);
  } catch (error) {
    res.status(500).send('데이터를 가져오는 중 문제가 발생했습니다.');
  }
};

// Mars Weather를 몽고디비에 저장
export const loadMarsWeather2DB = async (req, res) => {
  try {
    console.log('Loading');
    await getMarsData2Mongo();
    // console.log("data: ", data);
  } catch (error) {
    res.status(500).send('데이터를 가져오는 중 문제가 발생했습니다.');
  }
};

// 날씨를 가져온다
export const getWeather = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    // 몽고디비에서 Mars 날씨 데이터를 가져온다
    const marsWeatherData = await getLocationWeatherData(latitude, longitude);
    // 현재 위치의 날씨를 가져온다
    const earthWeatherData = await getLocationWeatherData(latitude, longitude);
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};

