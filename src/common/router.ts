import express from 'express';

import postRouter from '../post/post.router';

const appRouter = express();

appRouter.use('/post', postRouter);

export default appRouter;
