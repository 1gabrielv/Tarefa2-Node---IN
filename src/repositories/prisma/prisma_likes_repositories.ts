import prisma from '../../lib/prisma.js';
import { Prisma, type Like } from '../../../generated/prisma/index.js';
import type { LikesRepository } from '../likes_repositories.js';

export class PrismaLikesRepository implements LikesRepository {
  async create(data: Prisma.LikeUncheckedCreateInput) {
    const like = await prisma.like.create({ data })
    return like
  }


  async findUserLikeOnPost(userId: string, postId: string) {
    const like = await prisma.like.findFirst({
      where: { usuarioId: userId, postId: postId },
    })
    return like
  }

  async findUserLikeOnComment(userId: string, commentId: string) {
    const like = await prisma.like.findFirst({
      where: { usuarioId: userId, comentarioId: commentId },
    })
    return like
  }

  async findById(id: string) {
    const like = await prisma.like.findUnique({
      where: { id },
    })
    return like
  }

  async delete(id: string) {
    await prisma.like.delete({
      where: { id },
    })
  }
}