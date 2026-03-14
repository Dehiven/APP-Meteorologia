export const config = {
  port: process.env.PORT || 3001,
  openMeteoBaseUrl: 'https://api.open-meteo.com/v1',
  geocodingBaseUrl: 'https://geocoding-api.open-meteo.com/v1',
  corsOrigins: process.env.CORS_ORIGINS || '*',
};
