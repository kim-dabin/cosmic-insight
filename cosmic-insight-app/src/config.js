// config.js
const ENV = 'development'; // or 'production'

const CONFIG = {
  development: {
    BASE_URL: 'http://localhost:3000',
    NASA_API_URL: 'http://localhost:4333/api/nasa',
    OPENWEATHER_API_URL: 'http://localhost:3000/api/weather'
  },
  production: {
    BASE_URL: 'https://your-prod-server.com',
    NASA_API_URL: 'https://your-prod-server.com/api/nasa',
    OPENWEATHER_API_URL: 'https://your-prod-server.com/api/weather'
  }
};

export const { BASE_URL, NASA_API_URL, OPENWEATHER_API_URL } = CONFIG[ENV];