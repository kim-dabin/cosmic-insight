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

export const loadMarsWeather2DB = async (req, res) => {
  try {
    console.log('Loading');
    await getMarsData2Mongo();
    // console.log("data: ", data);
  } catch (error) {
    res.status(500).send('데이터를 가져오는 중 문제가 발생했습니다.');
  }
};

export const getWeather = async (req, res) => {

};

