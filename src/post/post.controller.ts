import type { Request, Response } from 'express';

import type { CreateUpdatePostDto } from './dto/create-update-post.dto';
import postService from './post.service';

class PostController {
  async create(
    req: Request<unknown, unknown, CreateUpdatePostDto>,
    res: Response,
  ): Promise<void> {
    const createdPost = await postService.create(req.body);
    res.send(createdPost);
  }

  async findAll(_req: Request, res: Response): Promise<void> {
    const foundPosts = await postService.findAll();
    res.send(foundPosts);
  }

  async findOne(req: Request<{ id: string }>, res: Response): Promise<void> {
    const foundPost = await postService.findOne(Number(req.params.id));
    res.send(foundPost);
  }

  async update(
    req: Request<{ id: string }, unknown, CreateUpdatePostDto>,
    res: Response,
  ): Promise<void> {
    const updatedPost = await postService.update(
      Number(req.params.id),
      req.body,
    );
    res.send(updatedPost);
  }

  async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
    const deletedPostId = await postService.delete(Number(req.params.id));
    res.send(deletedPostId);
  }
}

export default new PostController();
