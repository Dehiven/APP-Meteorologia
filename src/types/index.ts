export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
  location: LocationInfo;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  time: string;
}

export interface HourlyWeather {
  time: string[];
  temperature: number[];
  precipitation: number[];
  relativeHumidity: number[];
  weatherCode: number[];
}

export interface DailyWeather {
  time: string[];
  temperatureMax: number[];
  temperatureMin: number[];
  weatherCode: number[];
  sunrise?: string[];
  sunset?: string[];
  uvIndexMax?: number[];
}

export interface LocationInfo {
  name: string;
  country: string;
  admin1?: string;
  latitude?: number;
  longitude?: number;
}

export type UnitSystem = 'metric' | 'imperial';

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
}
