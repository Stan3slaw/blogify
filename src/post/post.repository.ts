import type { Knex } from 'knex';

import knexService from '../common/db/knex.service';
import type { CreateUpdatePost } from './interfaces/create-update-post.interface';
import type { Post } from './entities/post.entity';

class PostRepository {
  async create(
    createPost: CreateUpdatePost,
    trx?: Knex.Transaction<unknown, unknown[]>,
  ): Promise<Post> {
    const knex: Knex = trx ?? knexService;
    const [createdPost] = await knex('posts')
      .insert(createPost)
      .returning<Post[]>('*');

    return createdPost;
  }

  async findAll(trx?: Knex.Transaction<unknown, unknown[]>): Promise<Post[]> {
    const knex: Knex = trx ?? knexService;
    const foundPosts = await knex('posts').select<Post[]>();

    return foundPosts;
  }

  async findOne(
    postId: number,
    trx?: Knex.Transaction<unknown, unknown[]>,
  ): Promise<Post> {
    const knex: Knex = trx ?? knexService;
    const foundPost = await knex('posts').first<Post>().where({ id: postId });

    return foundPost;
  }

  async update(
    postId: number,
    updatePost: CreateUpdatePost,
    trx?: Knex.Transaction<unknown, unknown[]>,
  ): Promise<Post> {
    const knex: Knex = trx ?? knexService;
    const [updatedPost] = await knex('posts')
      .update(updatePost)
      .where({ id: postId })
      .returning<Post[]>('*');

    return updatedPost;
  }

  async delete(
    postId: number,
    trx?: Knex.Transaction<unknown, unknown[]>,
  ): Promise<Post> {
    const knex: Knex = trx ?? knexService;
    const [deletedPostId] = await knex('posts')
      .del()
      .where({ id: postId })
      .returning('id');

    return deletedPostId;
  }
}

export default new PostRepository();
