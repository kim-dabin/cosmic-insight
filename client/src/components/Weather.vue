<template>
    <!-- 버튼 -->
    <button @click="toggleWeather" class="weather-button">날씨 비교하기</button>

    <!-- 날씨 비교 결과 -->
 <div class="weather-comparison" :class="{ active: showWeather }">
      <h2>화성 vs 서울 날씨 비교</h2>
      <div v-if="loading">데이터를 불러오는 중...</div>
      <div v-else>
        <h3>서울 날씨</h3>
        <p>온도: {{ seoulWeather?.main?.temp }} °C</p>
        <p>기압: {{ seoulWeather?.main?.pressure }} hPa</p>

        <h3>화성 날씨</h3>
        <p>온도 (평균): {{ marsWeather?.AT?.av }} °C</p>
        <p>기압: {{ marsWeather?.PRE?.av }} Pa</p>
      </div>
    </div>
</template>
  
  <script>
  import axios from "axios";
  export default {
  data() {
    return {
      showWeather: false,
      loading: false,
      seoulWeather: null,
      marsWeather: null,
    };
  },
  methods: {
    toggleWeather() {
      if (!this.showWeather) {
        this.fetchWeather();
      }
      this.showWeather = !this.showWeather;
    },
    async fetchWeather() {
      this.loading = true;
      try {
        // 서울 날씨 가져오기
        const seoulResponse = await axios.get(
          "http://localhost:3000/api/seoul-weather"
        );
        this.seoulWeather = seoulResponse.data;

        // 화성 날씨 가져오기
        const marsResponse = await axios.get(
          "http://localhost:3000/api/mars-weather"
        );
        const latestSol =
          marsResponse.data.sol_keys[
            marsResponse.data.sol_keys.length - 1
          ];
        this.marsWeather = marsResponse.data[latestSol];
      } catch (error) {
        console.error("날씨 데이터를 가져오는데 실패했습니다:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
  </script>
  
  <style>
/* 버튼 스타일 */
.weather-button {
  position: fixed;
  top: 20px;
  right: 20px; /* 오른쪽 상단으로 배치 */
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
  z-index: 10;
}

.weather-button:hover {
  background-color: #2980b9;
}

/* 날씨 비교 컨테이너 스타일 */
.weather-comparison {
  position: fixed;
  top: 60px;
  right: 20px; /* 오른쪽 상단으로 배치 */
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  z-index: 10;
  text-align: left;
}

/* 날씨 비교 활성화 시 스타일 */
.weather-comparison.active {
    opacity: 0.8;
    transform:  translateY(0);
}

/* 텍스트 스타일 */
h2, h3 {
  margin-bottom: 10px;
  color: #2c3e50;
}

p {
  margin: 5px 0;
  font-size: 16px;
  color: #34495e;
}
  </style>