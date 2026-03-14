import type { UnitSystem } from '../types';

export const getWeatherIcon = (code: number): string => {
  const weatherIcons: Record<number, string> = {
    0: 'wi-day-sunny',
    1: 'wi-day-sunny',
    2: 'wi-day-partly-cloudy',
    3: 'wi-cloudy',
    45: 'wi-fog',
    48: 'wi-fog',
    51: 'wi-rain',
    53: 'wi-rain',
    55: 'wi-rain',
    61: 'wi-rain',
    63: 'wi-rain',
    65: 'wi-heavy-rain',
    71: 'wi-snow',
    73: 'wi-snow',
    75: 'wi-snow',
    77: 'wi-snow',
    80: 'wi-rain',
    81: 'wi-rain',
    82: 'wi-heavy-rain',
    85: 'wi-snow',
    86: 'wi-snow',
    95: 'wi-thunderstorm',
    96: 'wi-thunderstorm',
    99: 'wi-thunderstorm',
  };
  return weatherIcons[code] || 'wi-cloudy';
};

export const getWeatherDescription = (code: number): string => {
  const descriptions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  return descriptions[code] || 'Unknown';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const formatDayName = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const formatHour = (timeString: string): string => {
  const date = new Date(timeString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
};

export const getTemperatureUnit = (units: UnitSystem): string => {
  return units === 'metric' ? '°C' : '°F';
};

export const getWindSpeedUnit = (units: UnitSystem): string => {
  return units === 'metric' ? 'km/h' : 'mph';
};

export const getPrecipitationUnit = (units: UnitSystem): string => {
  return units === 'metric' ? 'mm' : 'in';
};
