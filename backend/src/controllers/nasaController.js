import { getRandomImage } from '../services/nasaService.js';
// export const saveApods = async (req, res) => {
//   try {
//     getAstronomyPictureOfTheDay().then(data => insertApods(data));
//     // 이미지들을 저장
//     // res.json(data);
//   } catch (error) {
//     res.status(500).send('NASA API 데이터를 가져오는 중 문제가 발생했습니다.');
//   }
// };

export const getApodImage = async (req, res) => {
  try {
    const data = await getRandomImage();
    res.json(data);
  } catch (error) {
    res.status(500).send('데이터를 가져오는 중 문제가 발생했습니다.');
  }
};


