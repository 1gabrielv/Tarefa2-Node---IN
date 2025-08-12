import type { Like } from '../../../generated/prisma/index.js';
import type { LikesRepository } from '@/repositories/likes_repositories.js';
import { ResourceNotFound_Error } from '../erros/resource_not_found_error.js';

interface GetLikeByIdUseCaseRequest {
  likeId: string
}

export class GetLikeByIdUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute({ likeId }: GetLikeByIdUseCaseRequest): Promise<Like> {
    const like = await this.likesRepository.findById(likeId)

    if (!like) {
      throw new ResourceNotFound_Error()
    }

    return like
  }
}