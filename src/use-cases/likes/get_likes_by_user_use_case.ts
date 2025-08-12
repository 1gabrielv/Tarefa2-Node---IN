import type { Like } from '../../../generated/prisma/index.js';
import type { LikesRepository } from '@/repositories/likes_repositories.js';
import type { UsersRepository } from '@/repositories/users_repositories.js';
import { ResourceNotFound_Error } from '../erros/resource_not_found_error.js';

interface GetLikesByUserUseCaseRequest {
  userId: string
}

export class GetLikesByUserUseCase {
  constructor(
    private likesRepository: LikesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ userId }: GetLikesByUserUseCaseRequest): Promise<Like[]> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFound_Error()
    }

    const likes = await this.likesRepository.findManyByUserId(userId)
    return likes
  }
}