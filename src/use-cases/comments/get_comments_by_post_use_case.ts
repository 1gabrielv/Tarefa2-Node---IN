import type { Comentario } from '../../../generated/prisma/index.js';
import type { CommentsRepository } from '@/repositories/comments_repositories.js';
import type { PostsRepository } from '@/repositories/post_repositories.js';
import { ResourceNotFound_Error } from '../erros/resource_not_found_error.js';

interface GetCommentsByPostUseCaseRequest {
  postId: string
}

export class GetCommentsByPostUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private postsRepository: PostsRepository,
  ) {}

  async execute({ postId }: GetCommentsByPostUseCaseRequest): Promise<Comentario[]> {
    const post = await this.postsRepository.findById(postId)
    if (!post) {
  throw new ResourceNotFound_Error();
    }

    const comments = await this.commentsRepository.findManyByPostId(postId)
    return comments
  }
}