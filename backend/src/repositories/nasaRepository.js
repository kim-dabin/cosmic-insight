import MarsWeather from '../models/MarsWeather.js';
import APOD from '../models/APOD.js';

// 데이터베이스에 APOD 데이터 저장
export const saveApodsToDB = async (data) => {
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

/**
 * 화성에서 특정 계절의 날씨 데이터를 가져옵니다.
 * @param {string} season 지구 계절 (spring, summer, fall, winter)
 * @returns {object[]} 화성의 날씨 데이터
 */
export const getMarsWeatherBySeason = async (season) => {
  try {
      const data = await MarsWeather.find({ Season: season });
      return data;
  } catch (error) {
      console.error('화성 날씨 데이터를 가져오는 데 실패했습니다:', error.message);
      throw error;
  }
};

export const saveMarsWeatherToDB = async (marsData) => {
  const solKeys = marsData.sol_keys;
  try {
      const operations = solKeys.map(async (sol) => {
          const solData = marsData[sol];
          const weather = {
              // sol,
              AT: solData.AT,
              HWS: solData.HWS,
              PRE: solData.PRE,
              Season: solData.Season,
              First_UTC: solData.First_UTC,
              Last_UTC: solData.Last_UTC,
          };
          console.log(weather);

          // 데이터 업데이트 또는 삽입
          await MarsWeather.findOneAndUpdate(
              { sol },
              weather,
              { upsert: true, new: true }
          );
      });

      await Promise.all(operations);
      console.log('화성 날씨 데이터를 MongoDB에 저장했습니다!');
  } catch (error) {
      console.error('MongoDB에 데이터를 저장하는 중 오류가 발생했습니다:', error.message);
  }
};