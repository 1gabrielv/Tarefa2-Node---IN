import { Prisma, type Like } from '../../generated/prisma/index.js';

export interface LikesRepository {
  create(data: Prisma.LikeUncheckedCreateInput): Promise<Like>
  findUserLikeOnPost(userId: string, postId: string): Promise<Like | null>
  findUserLikeOnComment(userId: string, commentId: string): Promise<Like | null>
  findById(id: string): Promise<Like | null>
  delete(id: string): Promise<void>
  findManyByUserId(userId: string): Promise<Like[]>
  findManyByPostId(postId: string): Promise<Like[]>
  findManyByCommentId(commentId: string): Promise<Like[]>
}