import axios from 'axios';
import type { GeocodingResult, WeatherData, UnitSystem } from '../types';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1';
const WEATHER_URL = 'https://api.open-meteo.com/v1';

export const geocodingApi = {
  search: async (query: string): Promise<GeocodingResult[]> => {
    const response = await axios.get<{ results: GeocodingResult[] }>(
      `${GEOCODING_URL}/search`,
      {
        params: {
          name: query,
          count: 10,
          language: 'en',
          format: 'json',
        },
      }
    );
    return response.data.results || [];
  },
};

export const weatherApi = {
  getWeather: async (
    lat: number,
    lon: number,
    name: string,
    country: string,
    admin1?: string,
    units: UnitSystem = 'metric'
  ): Promise<WeatherData> => {
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

    const response = await axios.get(`${WEATHER_URL}/forecast`, {
      params: {
        latitude: lat,
        longitude: lon,
        current: currentParams,
        hourly: hourlyParams,
        daily: dailyParams,
        timezone: 'auto',
        forecast_days: 7,
        ...(units === 'imperial' && {
          temperature_unit: 'fahrenheit',
          wind_speed_unit: 'mph',
          precipitation_unit: 'inch',
        }),
      },
    });

    return {
      current: {
        temperature: response.data.current.temperature_2m,
        apparentTemperature: response.data.current.apparent_temperature,
        relativeHumidity: response.data.current.relative_humidity_2m,
        windSpeed: response.data.current.wind_speed_10m,
        precipitation: response.data.current.precipitation,
        weatherCode: response.data.current.weather_code,
        time: response.data.current.time,
      },
      hourly: {
        time: response.data.hourly.time,
        temperature: response.data.hourly.temperature_2m,
        precipitation: response.data.hourly.precipitation,
        relativeHumidity: response.data.hourly.relative_humidity_2m,
        weatherCode: response.data.hourly.weather_code,
      },
      daily: {
        time: response.data.daily.time,
        temperatureMax: response.data.daily.temperature_2m_max,
        temperatureMin: response.data.daily.temperature_2m_min,
        weatherCode: response.data.daily.weather_code,
      },
      location: {
        name,
        country,
        admin1,
      },
    };
  },
};
