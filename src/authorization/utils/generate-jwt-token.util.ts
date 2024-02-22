import { sign } from 'jsonwebtoken';
import type { Response } from 'express';

import { JWT_SECRET } from '../../common/constants';
import type { AuthorizationResponseDto } from '../dto/authorization-response.dto';

export function generateJWTToken(
  res: Response,
  payload: { id: number; email: string },
): AuthorizationResponseDto {
  const token = sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000,
  });

  return { token };
}
