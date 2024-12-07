import 'dotenv/config'
import APOD from "../models/APOD.js";

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