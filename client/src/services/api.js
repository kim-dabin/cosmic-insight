import axios from "axios";

// Axios 기본 설정
const apiClient = axios.create({
    baseURL: 'http://localhost:4333/api', // API의 기본 URL
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5000, // 요청 타임아웃 설정
  });

export const fetchAPOD = async () => {
    try {
        const response = await apiClient.get('/nasa/apod');
        return response.data;
    } catch (err) {
        console.error('APOD 데이터를 가져오는 중 오류 발생: ', err);
        throw err;
    }
};

export const fetchMarsWeather = async () => {
    try {
        const response = await apiClient.get('/nasa/mars-weather');
        return response.data;
    } catch (err) {
        console.log('Mars Weather 데이터를 가져오는 중 오류 발생: ', err);
        throw err;
    }
};