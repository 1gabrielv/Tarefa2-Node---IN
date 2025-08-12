import type { Comentario } from '../../../generated/prisma/index.js';
import type { CommentsRepository } from '@/repositories/comments_repositories.js';
import type { UsersRepository } from '@/repositories/users_repositories.js';
import { ResourceNotFound_Error } from '../erros/resource_not_found_error.js';

interface GetCommentsByUserUseCaseRequest {
  userId: string
}

export class GetCommentsByUserUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ userId }: GetCommentsByUserUseCaseRequest): Promise<Comentario[]> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
  throw new ResourceNotFound_Error();
    }

    const comments = await this.commentsRepository.findManyByUserId(userId)
    return comments
  }
}