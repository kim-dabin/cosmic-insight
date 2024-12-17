import { getRandomImage, saveMarsData2Mongo, getMarsEarthWeatherData } from '../services/nasaService.js';
import { getLocationWeatherData } from '../services/apiService.js';

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
    await saveMarsData2Mongo();
    // console.log("data: ", data);
  } catch (error) {
    res.status(500).send('데이터를 가져오는 중 문제가 발생했습니다.');
  }
};

// 날씨를 가져온다
export const getWeather = async (req, res) => {
  try {
    // const { latitude, longitude } = req.body;
    console.log(req.body);
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    // 몽고디비에서 Mars 날씨 데이터를 가져온다
    const marsWeatherData = await getMarsEarthWeatherData(latitude, longitude);
    // 현재 위치의 날씨를 가져온다
    const earthWeatherData = await getLocationWeatherData(latitude, longitude);
    console.log("*****************");
    console.log(marsWeatherData);
    console.log("*****************");

    res.json({"mars": marsWeatherData, "earth": earthWeatherData});
  } catch (err) {
    console.error(err);
    res.json({error: err});
  }
};

