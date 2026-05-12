import { redisClient } from "../../config";
import { Weather } from "../../models";
import { TGetCitiesAnalytics, TGetCitiesAnalyticsResponse, TGetSingleCityAnalytics, TGetSingleCityAnalyticsResponse } from "../../utilities";
import { BaseService } from "../base.service";
import { weatherService } from "./weather.service";

class AnalyticsService extends BaseService<Weather> {
  constructor() {
    super(Weather);
  }

  async getCitiesAnalytics(data: TGetCitiesAnalytics): Promise<TGetCitiesAnalyticsResponse> {
    try {
      const cacheKey = `cities: ${data.cities.join(",")}`;

      const cacheData = await redisClient.get(cacheKey);

      if (cacheData) return JSON.parse(cacheData);

      const weatherData = await Promise.all(
        data.cities.map((city) => weatherService.getCityWeather({ city })),
      );

      const formatted = weatherData.map((item) => ({
        city: item.name,
        temperature: item.main.temp,
        minTemperature: item.main.temp_min,
        maxTemperature: item.main.temp_max,
        humidity: item.main.humidity,
        weather: item.weather[0].main,
      }));

      await this.model.bulkCreate(formatted);

      const temperatures = formatted.map((city) => city.temperature);

      const averageTemperature =
        temperatures.reduce((acc, curr) => acc + curr, 0) / temperatures.length;

      const highestTemperature = formatted.reduce((prev, curr) =>
        curr.temperature > prev.temperature ? curr : prev,
      );

      const lowestTemperature = formatted.reduce((prev, curr) =>
        curr.temperature < prev.temperature ? curr : prev,
      );

      const hotCities = formatted
        .filter((city) => city.temperature > 35)
        .map((city) => city.city);

      const response = {
        averageTemperature,
        highestTemperature: {
          city: highestTemperature.city,
          temperature: highestTemperature.temperature,
        },

        lowestTemperature: {
          city: lowestTemperature.city,
          temperature: lowestTemperature.temperature,
        },

        hotCities,
      };

      await redisClient.set(cacheKey, JSON.stringify(response), {
        EX: 300,
      });

      return response;
    } catch (error) {
      console.log("analytics error", error);
      throw error;
    }
  }

  async getSingleCityAnalytics(data: TGetSingleCityAnalytics): Promise<TGetSingleCityAnalyticsResponse> {
    try {
      const cacheKey = `city: ${data.city}`;

      const cacheData = await redisClient.get(cacheKey);

      if (cacheData) return JSON.parse(cacheData);

      const currentWeather = await weatherService.getCityWeather({
        city: data.city,
      });

      const forecast = await weatherService.getForecast({ city: data.city });

      const warning =
        currentWeather.main.temp > 35 ? "Temperature exceeds 35 C" : null;

      const response = {
        city: data.city,
        currentTemperature: currentWeather.main.temp,
        minTemperature: currentWeather.main.temp_min,
        maxTemperature: currentWeather.main.temp_max,
        humidity: currentWeather.main.humidity,
        warning,
        forecast: forecast.list.slice(0, 5).map((item: any) => ({
          data: item.dt_txt,
          temperature: item.main.temp,
          minTemperature: item.main.temp_min,
          maxTemperature: item.main.temp_max,
        })),
      };

      await redisClient.set(cacheKey, JSON.stringify(response), {
        EX: 300,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const analyticsService = new AnalyticsService();
