import express from 'express';

import { authorizationMiddleware } from '../authorization/middlewares/authorization.middleware';
import authorizationRouter from '../authorization/authorization.router';
import postRouter from '../post/post.router';
import { errorHandler } from './utils/error-handler.util';

const appRouter = express();

appRouter.use('/post', errorHandler(authorizationMiddleware), postRouter);
appRouter.use('/auth', authorizationRouter);

export default appRouter;
