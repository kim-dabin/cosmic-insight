import mongoose from 'mongoose';

const MarsWeatherSchema = new mongoose.Schema(
    {
        sol: { type: String, required: true, unique: true },
        AT: {
            av: Number, // 평균 온도
            mn: Number, // 최저 온도
            mx: Number, // 최고 온도
        },
        HWS: {
            av: Number, // 평균 풍속
            mn: Number, // 최저 풍속
            mx: Number, // 최고 풍속
        },
        PRE: {
            av: Number, // 평균 대기압
            mn: Number,
            mx: Number,
        },
        Season: String, // 계절
        First_UTC: Date, // 데이터 수집 시작 시간
        Last_UTC: Date,  // 데이터 수집 종료 시간
    },
    { timestamps: true } // 생성 및 수정 시간 자동 기록
);

const MarsWeather = mongoose.model('MarsWeather', MarsWeatherSchema);
export default MarsWeather;