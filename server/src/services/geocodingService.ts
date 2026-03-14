import axios from 'axios';
import { config } from '../config';
import { GeocodingResponse, GeocodingResult } from '../types';
import { z } from 'zod';

const searchQuerySchema = z
  .string()
  .min(2, 'Search query must be at least 2 characters')
  .max(80, 'Search query must not exceed 80 characters')
  .regex(/^[a-zA-Z0-9\s\-.,ñáéíóúüÑÁÉÍÓÚÜ]+$/, 'Invalid characters in search query');

export class GeocodingService {
  async searchLocations(query: string): Promise<GeocodingResult[]> {
    const sanitizedQuery = searchQuerySchema.parse(query.trim());

    const response = await axios.get<GeocodingResponse>(
      `${config.geocodingBaseUrl}/search`,
      {
        params: {
          name: sanitizedQuery,
          count: 10,
          language: 'en',
          format: 'json',
        },
      }
    );

    if (!response.data.results || response.data.results.length === 0) {
      return [];
    }

    return response.data.results;
  }
}

export const geocodingService = new GeocodingService();
