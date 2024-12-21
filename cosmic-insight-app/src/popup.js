  // -------------------------------
  // NASA APOD 관련 로직
  // -------------------------------
  const titleElement = document.getElementById('title');
  const changeBgButton = document.getElementById('changeBgButton');
  let apodData = {};
  let imageUrl = '';

  // (Axios 대신) fetch를 사용해 APOD 데이터 가져오기
  async function fetchAPOD() {
    try {
      // 예: baseURL이 http://localhost:4333/api 일 경우
      const res = await fetch('http://localhost:4333/api/nasa/apod'); 
      if (!res.ok) {
        throw new Error('APOD 데이터를 가져오는 중 오류가 발생했습니다.');
      }
      return await res.json();
    } catch (error) {
      console.error('APOD 데이터를 가져오는 중 오류 발생: ', error);
      throw error;
    }
  }

  function updateBackground(url) {
    document.body.style.backgroundImage = `url(${url})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  }

  async function loadAPODData() {
    const cachedData = localStorage.getItem('apodData');
    if (cachedData) {
      apodData = JSON.parse(cachedData);
      imageUrl = apodData.url;
      titleElement.textContent = apodData.title || '';
      updateBackground(imageUrl);
    } else {
      await fetchImage();
    }
  }

  async function fetchImage() {
    try {
      apodData = await fetchAPOD();
      imageUrl = apodData.url;
      titleElement.textContent = apodData.title || '';
      // 로컬 스토리지에 API 결과 저장
      localStorage.setItem('apodData', JSON.stringify(apodData));
      // 배경화면 업데이트
      updateBackground(imageUrl);
    } catch (error) {
      console.error("이미지를 가져오는 중 오류가 발생했습니다:", error);
    }
  }

  // -------------------------------
  // 날씨 비교 관련 로직
  // -------------------------------
  const weatherButton = document.getElementById('weatherButton');
  const weatherComparison = document.getElementById('weatherComparison');
  const loadingMessage = document.getElementById('loadingMessage');
  const weatherData = document.getElementById('weatherData');

  const seoulTemp = document.getElementById('seoulTemp');
  const seoulPressure = document.getElementById('seoulPressure');
  const marsTemp = document.getElementById('marsTemp');
  const marsPressure = document.getElementById('marsPressure');
  const earthWeather = document.getElementById('earthWeather');
  const marsWeather = document.getElementById('marsWeather');

  let showWeather = false;

  async function fetchSeoulWeather() {
    try {
      const res = await fetch('http://localhost:3000/api/seoul-weather');
      if (!res.ok) {
        throw new Error('서울 날씨 데이터를 가져오는 중 오류가 발생했습니다.');
      }
      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function fetchMarsWeather(data = {}) {
    try {
      const res = await fetch('http://localhost:4333/api/nasa/insight/weather', {
        method: "POST",
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        throw new Error('화성 날씨 데이터를 가져오는 중 오류가 발생했습니다.');
      }
      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function fetchInsightWeather(latitude, longitude) {
    try {
      const res = await fetch('http://localhost:4333/api/nasa/insight/weather', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({latitude: latitude, longitude: longitude})
      });
      if (!res.ok) {
        throw new Error('화성 날씨 데이터를 가져오는 중 오류가 발생했습니다.');
      }
      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function fetchWeather(latitude, longitude) {
    loadingMessage.style.display = 'block';
    weatherData.style.display = 'none';
    try {
      console.log(latitude + ' ' + longitude);
      const weatherData = await fetchInsightWeather(latitude, longitude);
      console.log(weatherData);
      // 서울 날씨
      const earth = weatherData.earth;
      seoulTemp.textContent = `온도: ${earth?.main?.temp} °C`;
      seoulPressure.textContent = `기압: ${earth?.main?.pressure} hPa`;
      earthWeather.textContent = `${earth?.name}`;
      // 화성 날씨
      const mars = weatherData.mars
      marsTemp.textContent = `온도 (평균): ${mars?.AT?.av} °C`;
      marsPressure.textContent = `기압: ${mars?.PRE?.av} Pa`;
      marsWeather.textContent = `Mars - season: ${mars?.Season}`
    } catch (error) {
      console.error('날씨 데이터를 가져오는데 실패했습니다:', error);
    } finally {
      // 로딩 표시 종료
      loadingMessage.style.display = 'none';
      weatherData.style.display = 'block';
    }
  }

  function getUserLocation() {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
          },
          (error) => {
            reject(error);
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }

  function toggleWeather() {
    showWeather = !showWeather;
    if (showWeather) {
      weatherComparison.classList.add('active');
      getUserLocation().then((data) => {
        return fetchWeather(data.lat, data.lon);
      })
    } else {
      weatherComparison.classList.remove('active');
    }
  }

  // -------------------------------
  // 이벤트 바인딩
  // -------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    // NASA APOD 로드
    loadAPODData();

    // "이미지 변경" 버튼 클릭 시
    changeBgButton.addEventListener('click', fetchImage);

    // "날씨 비교하기" 버튼 클릭 시
    weatherButton.addEventListener('click', toggleWeather);
  });