import { Request, Response, NextFunction } from 'express';
import { geocodingService } from '../services/geocodingService';
import { ApiError } from '../types';

export class GeocodingController {
  async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { q } = req.query;

      if (!q || typeof q !== 'string') {
        const error: ApiError = {
          message: 'Search query is required',
          code: 'MISSING_QUERY',
          statusCode: 400,
        };
        res.status(400).json(error);
        return;
      }

      const results = await geocodingService.searchLocations(q);

      if (results.length === 0) {
        res.status(404).json({
          message: 'No locations found',
          code: 'NOT_FOUND',
          statusCode: 404,
        });
        return;
      }

      res.json(results);
    } catch (error) {
      next(error);
    }
  }
}

export const geocodingController = new GeocodingController();
