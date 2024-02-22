import type { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';

import userService from '../../user/user.service';
import { HttpStatus } from '../../common/exceptions/http-status.enum';
import { HttpException } from '../../common/exceptions/http.exception';
import { JWT_SECRET } from '../../common/constants';

export async function authorizationMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new HttpException('No token provided', HttpStatus.FORBIDDEN);
    }

    const decoded = verify(token, JWT_SECRET) as JwtPayload;

    if (!decoded || !decoded.id) {
      throw new HttpException('UserId not found', HttpStatus.UNAUTHORIZED);
    }

    const user = await userService.findOneById(decoded.id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);

    throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  }
}
