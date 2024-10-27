import axios from 'axios';
import { NASA_API_KEY, NASA_BASE_URL } from '../config/config.js';

class NasaModel {
  static async getApodData() {
    try {
      const response = await axios.get(`${NASA_BASE_URL}/planetary/apod`, {
        params: {
          api_key: NASA_API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data from NASA API:', error);
      throw error;
    }
  }
}

export default NasaModel;