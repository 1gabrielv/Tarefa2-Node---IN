import type { Like } from '../../../generated/prisma/index.js';
import type { LikesRepository } from '@/repositories/likes_repositories.js';
import type { CommentsRepository } from '@/repositories/comments_repositories.js';
import { ResourceNotFound_Error } from '../erros/resource_not_found_error.js';

interface GetLikesByCommentUseCaseRequest {
  commentId: string
}

export class GetLikesByCommentUseCase {
  constructor(
    private likesRepository: LikesRepository,
    private commentsRepository: CommentsRepository,
  ) {}

  async execute({ commentId }: GetLikesByCommentUseCaseRequest): Promise<Like[]> {
    const comment = await this.commentsRepository.findById(commentId)
    if (!comment) {
  throw new ResourceNotFound_Error();
    }

    const likes = await this.likesRepository.findManyByCommentId(commentId)
    return likes
  }
}