import { getAstronomyPictureOfTheDay } from '../services/nasaService.js';

export const getApod = async (req, res) => {
  try {
    const data = await getAstronomyPictureOfTheDay();
    res.json(data);
  } catch (error) {
    res.status(500).send('NASA API 데이터를 가져오는 중 문제가 발생했습니다.');
  }
};
