import 'dotenv/config'
import APOD from "../models/APOD.js";
import MarsWeather from '../models/MarsWeather.js';
import { getInsightWeatherData } from '../services/apiService.js';
import { saveMarsWeatherToDB, getMarsWeatherBySeason } from '../repositories/nasaRepository.js';
import { getEarthSeason } from '../utils/helps.js';

export async function getRandomImage() {
  try {
    const randomImage = await APOD.aggregate([
      { $sample: { size: 1 } } // 컬렉션에서 무작위로 하나의 문서 선택
    ]);

    if (randomImage.length > 0) {
      return randomImage[0]; // 무작위로 선택된 이미지 데이터 반환
    } else {
      throw new Error('데이터베이스에 저장된 이미지가 없습니다.');
    }
  } catch (error) {
    console.error('랜덤 이미지 가져오기 실패:', error);
    throw error;
  }
}

// 현재 위치의 날씨와 유사한 화성 날씨 가져오기
export const getMarsEarthWeatherData = async (latitude, longitude) => {
  try {
    // const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
      return res.status(400).json({ error: '위도와 경도 값이 필요합니다.' });
    }
    // 현재 계절 찾기
    const season = await getEarthSeason(latitude);

    // 현재 계절과 맞는 화성 날씨 가져오기
    const marsWeatherData = await getMarsWeatherBySeason(season);

    console.log(marsWeatherData);

  } catch (error) {

  }
}

// Mars 날씨 데이터를 몽고디비에 저장
export const saveMarsData2Mongo = async () => {
  try {
    const data = await getInsightWeatherData();
    saveMarsWeatherToDB(data);
  } catch (error) {
    console.error('Mars 데이터 수집 실패:', error);
    throw error;
  }
};