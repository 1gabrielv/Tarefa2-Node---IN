import type { Comentario } from '../../../generated/prisma/index.js';
import type { CommentsRepository } from '@/repositories/comments_repositories.js';
import { ResourceNotFound_Error } from '../erros/resource_not_found_error.js';

interface GetCommentByIdUseCaseRequest {
  commentId: string
}

export class GetCommentByIdUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({ commentId }: GetCommentByIdUseCaseRequest): Promise<Comentario> {
    const comment = await this.commentsRepository.findById(commentId)

    if (!comment) {
      throw new ResourceNotFound_Error()
    }

    return comment
  }
}