import { Request, Response, NextFunction } from 'express';
import { weatherService } from '../services/weatherService';
import { ApiError } from '../types';
import { z } from 'zod';

const weatherQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
  name: z.string().min(1),
  country: z.string().min(1),
  admin1: z.string().optional(),
  units: z.enum(['metric', 'imperial']).optional(),
});

export class WeatherController {
  async getWeather(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = weatherQuerySchema.parse(req.query);

      const weatherData = await weatherService.getWeather({
        latitude: params.lat,
        longitude: params.lon,
        locationName: params.name,
        country: params.country,
        admin1: params.admin1,
        units: params.units,
      });

      res.json(weatherData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const apiError: ApiError = {
          message: error.errors[0].message,
          code: 'VALIDATION_ERROR',
          statusCode: 400,
        };
        res.status(400).json(apiError);
        return;
      }
      next(error);
    }
  }
}

export const weatherController = new WeatherController();
