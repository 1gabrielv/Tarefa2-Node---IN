// Caminho do arquivo: src/repositories/likes_repository.ts
import { Prisma, type Like } from '../../generated/prisma/index.js';

export interface LikesRepository {
  create(data: Prisma.LikeUncheckedCreateInput): Promise<Like>
  findUserLikeOnPost(userId: string, postId: string): Promise<Like | null>
  findUserLikeOnComment(userId: string, commentId: string): Promise<Like | null>
  findById(id: string): Promise<Like | null>
  delete(id: string): Promise<void>
}