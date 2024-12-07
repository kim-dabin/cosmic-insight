import mongoose from 'mongoose';

// APOD 데이터 스키마 정의
const apodSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // 날짜
  title: { type: String, required: true },              // 제목
  explanation: { type: String },                        // 설명
  url: { type: String, required: true },                // 이미지 URL
  media_type: { type: String, required: true },         // 이미지 또는 동영상
  createdAt: { type: Date, default: Date.now },         // 데이터 저장 시간
});

// Mongoose 모델 생성
const APOD = mongoose.model('APOD', apodSchema);

// 모델 내보내기
export default APOD;