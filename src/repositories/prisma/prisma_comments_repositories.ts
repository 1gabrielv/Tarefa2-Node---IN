import prisma from '@/lib/prisma.js';
import { Prisma, type Comentario } from '../../../generated/prisma/index.js';
import type { CommentsRepository } from '../comments_repositories.js';

export class PrismaCommentsRepository implements CommentsRepository {
  async create(data: Prisma.ComentarioUncheckedCreateInput) {
    const comment = await prisma.comentario.create({ data })
    return comment
  }

  async findById(id: string) {
    const comment = await prisma.comentario.findUnique({
      where: { id },
    })
    return comment
  }

  async findAll() {
    const comments = await prisma.comentario.findMany({
      include: {
        usuario: true,
        post: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return comments
  }

  async delete(id: string) {
    await prisma.comentario.delete({
      where: { id },
    })
  }

  async findManyByUserId(userId: string) {
    const comments = await prisma.comentario.findMany({
      where: {
        usuarioId: userId,
      },
      include: {
        post: true, 
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return comments
  }

  async findManyByPostId(postId: string) {
    const comments = await prisma.comentario.findMany({
      where: {
        postId: postId,
      },
      include: {
        usuario: true, 
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return comments
  }
}