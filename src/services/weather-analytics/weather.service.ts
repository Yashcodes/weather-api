import {
  axiosInstance,
  TGetCityWeather,
  TGetForecast,
  TGetWeatherByCoordinates,
} from "../../utilities";

class WeatherService {
  async getCityWeather(data: TGetCityWeather) {
    try {
      const response = await axiosInstance.get("/data/2.5/weather", {
        params: {
          q: data.city,
          units: "metric",
          appid: process.env.WEATHER_API_KEY,
        },
      });

      return response.data;
    } catch (error) {
      // console.log("weather error", error.message)
      throw error;
    }
  }

  async getForecast(data: TGetForecast) {
    try {
      const response = await axiosInstance.get("/data/2.5/forecast", {
        params: {
          q: data.city,
          units: "metric",
          appid: process.env.WEATHER_API_KEY,
        },
      });

      return response.data;
    } catch (error) {
      // console.log("forecast error", error.message)
      throw error;
    }
  }
}

export const weatherService = new WeatherService();
