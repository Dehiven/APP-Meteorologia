import axios from 'axios';
import { config } from '../config';
import { WeatherData, WeatherQueryParams, CurrentWeather, HourlyWeather, DailyWeather, LocationInfo } from '../types';
import { z } from 'zod';

const coordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export class WeatherService {
  async getWeather(params: WeatherQueryParams): Promise<WeatherData> {
    coordinatesSchema.parse({
      latitude: params.latitude,
      longitude: params.longitude,
    });

    const currentParams = [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'wind_speed_10m',
      'precipitation',
      'weather_code',
    ].join(',');

    const hourlyParams = [
      'temperature_2m',
      'precipitation',
      'relative_humidity_2m',
      'weather_code',
    ].join(',');

    const dailyParams = [
      'temperature_2m_max',
      'temperature_2m_min',
      'weather_code',
    ].join(',');

    const response = await axios.get(`${config.openMeteoBaseUrl}/forecast`, {
      params: {
        latitude: params.latitude,
        longitude: params.longitude,
        current: currentParams,
        hourly: hourlyParams,
        daily: dailyParams,
        timezone: 'auto',
        forecast_days: 7,
        ...(params.units === 'imperial' && {
          temperature_unit: 'fahrenheit',
          wind_speed_unit: 'mph',
          precipitation_unit: 'inch',
        }),
      },
    });

    const location: LocationInfo = {
      name: params.locationName,
      country: params.country,
      admin1: params.admin1,
    };

    const current: CurrentWeather = {
      temperature: response.data.current.temperature_2m,
      apparentTemperature: response.data.current.apparent_temperature,
      relativeHumidity: response.data.current.relative_humidity_2m,
      windSpeed: response.data.current.wind_speed_10m,
      precipitation: response.data.current.precipitation,
      weatherCode: response.data.current.weather_code,
      time: response.data.current.time,
    };

    const hourly: HourlyWeather = {
      time: response.data.hourly.time,
      temperature: response.data.hourly.temperature_2m,
      precipitation: response.data.hourly.precipitation,
      relativeHumidity: response.data.hourly.relative_humidity_2m,
      weatherCode: response.data.hourly.weather_code,
    };

    const daily: DailyWeather = {
      time: response.data.daily.time,
      temperatureMax: response.data.daily.temperature_2m_max,
      temperatureMin: response.data.daily.temperature_2m_min,
      weatherCode: response.data.daily.weather_code,
    };

    return { current, hourly, daily, location };
  }
}

export const weatherService = new WeatherService();
