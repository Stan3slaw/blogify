import { Router } from 'express';

import { validationPipe } from '../common/pipes/validation.pipe';
import { errorHandler } from '../common/utils/error-handler.util';
import postController from './post.controller';
import {
  CreateUpdatePostDto,
  CreateUpdatePostGroups,
} from './dto/create-update-post.dto';

const postRouter = Router();

postRouter.post(
  '/',
  validationPipe(CreateUpdatePostDto, [CreateUpdatePostGroups.CREATE]),
  errorHandler(postController.create),
);
postRouter.get('/', errorHandler(postController.findAll));
postRouter.get('/:id', errorHandler(postController.findOne));
postRouter.patch(
  '/:id',
  validationPipe(CreateUpdatePostDto, [CreateUpdatePostGroups.UPDATE]),
  errorHandler(postController.update),
);
postRouter.delete('/:id', errorHandler(postController.delete));

export default postRouter;
