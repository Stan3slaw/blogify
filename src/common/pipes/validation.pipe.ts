import { validate } from 'class-validator';
import type { ClassConstructor } from 'class-transformer';
import { plainToInstance } from 'class-transformer';
import type { NextFunction, Request, Response } from 'express';

import { HttpStatus } from '../exceptions/http-status.enum';

export function validationPipe<T>(
  targetClass: ClassConstructor<T>,
  groups: string[] = [],
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    req.body = plainToInstance(targetClass, req.body, { groups });

    const errors = await validate(req.body, {
      groups,
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        messages: errors.map((error) => ({
          [error.property]: Object.values(error.constraints),
        })),
      });
    }
    next();
  };
}
