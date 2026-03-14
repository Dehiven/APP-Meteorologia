import axios from 'axios';
import type { GeocodingResult, WeatherData, UnitSystem } from '../types';

const api = axios.create({
  baseURL: '/api',
});

export const geocodingApi = {
  search: (query: string) => api.get<GeocodingResult[]>('/geocoding/search', { params: { q: query } }),
};

export const weatherApi = {
  getWeather: (
    lat: number,
    lon: number,
    name: string,
    country: string,
    admin1?: string,
    units?: UnitSystem
  ) =>
    api.get<WeatherData>('/weather', {
      params: {
        lat,
        lon,
        name,
        country,
        admin1,
        units,
      },
    }),
};
