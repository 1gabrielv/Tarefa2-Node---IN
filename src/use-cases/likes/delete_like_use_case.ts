import type { LikesRepository } from '@/repositories/likes_repositories.js';
import { ResourceNotFound_Error } from '../erros/resource_not_found_error.js';
import { NotAllowedError } from '../erros/not_allowed_error.js';

interface DeleteLikeUseCaseRequest {
  likeId: string
  requestingUserId: string
}

export class DeleteLikeUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute({ likeId, requestingUserId }: DeleteLikeUseCaseRequest): Promise<void> {
    const like = await this.likesRepository.findById(likeId)
    if (!like) {
      throw new ResourceNotFound_Error()
    }

    if (like.usuarioId !== requestingUserId) {
      throw new NotAllowedError()
    }

    await this.likesRepository.delete(likeId)
  }
}