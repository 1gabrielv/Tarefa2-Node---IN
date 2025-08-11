import type { CommentsRepository } from '../../repositories/comments_repositories.js';
import { ResourceNotFound_Error } from '../erros/resource_not_found_error.js';
import { NotAllowedError } from '../erros/not_allowed_error.js';

interface DeleteCommentUseCaseRequest {
  commentId: string
  requestingUserId: string
}

export class DeleteCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({ commentId, requestingUserId }: DeleteCommentUseCaseRequest): Promise<void> {
    const comment = await this.commentsRepository.findById(commentId)
    if (!comment) {
      throw new ResourceNotFound_Error()
    }

    if (comment.usuarioId !== requestingUserId) {
      throw new NotAllowedError()
    }

    await this.commentsRepository.delete(commentId)
  }
}   