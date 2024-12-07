import mongoose from 'mongoose';

// 화성 날씨 스키마 정의
const marsWeatherSchema = new mongoose.Schema({
  sol: { type: String, required: true, unique: true }, // 화성의 Sol
  temperature: {
    average: Number,
    min: Number,
    max: Number,
  },
  pressure: {
    average: Number,
    min: Number,
    max: Number,
  },
  wind: {
    direction: String,
    speed: Number,
  },
  createdAt: { type: Date, default: Date.now }, // 데이터 저장 시간
});

// 모델 생성
const MarsWeather = mongoose.model('MarsWeather', marsWeatherSchema);

// 모델 내보내기
export default MarsWeather;