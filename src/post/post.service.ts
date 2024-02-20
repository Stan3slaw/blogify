import { HttpStatus } from '../common/exceptions/http-status.enum';
import { HttpException } from '../common/exceptions/http.exception';
import type { CreateUpdatePostDto } from './dto/create-update-post.dto';
import type { PostResponseDto } from './dto/post-response.dto';
import postRepository from './post.repository';

class PostService {
  async create(createPostDto: CreateUpdatePostDto): Promise<PostResponseDto> {
    const createdPost = await postRepository.create(createPostDto);

    return createdPost;
  }

  async findAll(): Promise<PostResponseDto[]> {
    const foundPosts = await postRepository.findAll();

    return foundPosts;
  }

  async findOne(postId: number): Promise<PostResponseDto> {
    const createdPost = await postRepository.findOne(postId);

    return createdPost;
  }

  async update(
    postId: number,
    updatePostDto: CreateUpdatePostDto,
  ): Promise<PostResponseDto> {
    const foundPost = await this.findOne(postId);

    if (!foundPost) {
      throw new HttpException('Cannot find post', HttpStatus.BAD_REQUEST);
    }

    if (Object.values(updatePostDto).every((value: string) => value === '')) {
      throw new HttpException(
        'Data to update not provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedPost = await postRepository.update(postId, updatePostDto);

    return updatedPost;
  }

  async delete(postId: number): Promise<{ id: number }> {
    const deletedPostId = await postRepository.delete(postId);

    return deletedPostId;
  }
}

export default new PostService();
