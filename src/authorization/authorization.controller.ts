import type { Request, Response } from 'express';

import type { RegisterUserDto } from './dto/register-user.dto';
import authorizationService from './authorization.service';
import type { LoginUserDto } from './dto/login-user.dto';
import { generateJWTToken } from './utils/generate-jwt-token.util';

class AuthorizationController {
  async register(
    req: Request<unknown, unknown, RegisterUserDto>,
    res: Response,
  ): Promise<void> {
    const payload = await authorizationService.register(req.body);
    const generatedToken = generateJWTToken(res, payload);
    res.send(generatedToken);
  }

  async login(
    req: Request<unknown, unknown, LoginUserDto>,
    res: Response,
  ): Promise<void> {
    const payload = await authorizationService.login(req.body);
    const generatedToken = generateJWTToken(res, payload);
    res.send(generatedToken);
  }

  async getCurrentUser(req: Request, res: Response): Promise<void> {
    const currentUser = await authorizationService.login(req.user.id);
    res.send(currentUser);
  }
}

export default new AuthorizationController();
