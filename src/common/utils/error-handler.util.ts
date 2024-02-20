import type { NextFunction, Request, Response } from 'express';

import { HttpStatus } from '../exceptions/http-status.enum';

export function errorHandler(callback) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(callback(req, res, next)).catch((error) => {
      if (error.status) {
        res
          .status(error.status)
          .json({ status: error.status, error: error.message });
      } else {
        console.error(
          `[${req.method}] [${req.originalUrl}] : ${error.message}`,
        );

        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
        });
      }
    });
  };
}
