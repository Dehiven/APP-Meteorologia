import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('Error:', err);

  if (err instanceof AppError) {
    const apiError: ApiError = {
      message: err.message,
      code: err.code,
      statusCode: err.statusCode,
    };
    res.status(err.statusCode).json(apiError);
    return;
  }

  if (err.name === 'ZodError') {
    const apiError: ApiError = {
      message: 'Validation error',
      code: 'VALIDATION_ERROR',
      statusCode: 400,
    };
    res.status(400).json(apiError);
    return;
  }

  const apiError: ApiError = {
    message: 'Internal server error',
    code: 'INTERNAL_ERROR',
    statusCode: 500,
  };
  res.status(500).json(apiError);
}
