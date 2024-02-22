import { Router } from 'express';

import { validationPipe } from '../common/pipes/validation.pipe';
import { RegisterUserDto } from './dto/register-user.dto';
import { errorHandler } from '../common/utils/error-handler.util';
import authorizationController from './authorization.controller';
import { LoginUserDto } from './dto/login-user.dto';

const authorizationRouter = Router();

authorizationRouter.post(
  '/register',
  validationPipe(RegisterUserDto),
  errorHandler(authorizationController.register),
);
authorizationRouter.post(
  '/login',
  validationPipe(LoginUserDto),
  errorHandler(authorizationController.login),
);
authorizationRouter.post(
  '/currentUser',
  errorHandler(authorizationController.getCurrentUser),
);

export default authorizationRouter;
