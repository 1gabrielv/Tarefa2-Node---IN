import type { Comentario } from '../../../generated/prisma/index.js';
import type { CommentsRepository } from '../../repositories/comments_repositories.js';

export class GetAllCommentsUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute(): Promise<Comentario[]> {
    const comments = await this.commentsRepository.findAll()
    return comments
  }
}