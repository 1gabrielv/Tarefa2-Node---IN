import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma_comments_repositories.js';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma_users_repositories.js';
import { GetCommentsByUserUseCase } from '@/use-cases/comments/get_comments_by_user_use_case.js';
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';

export async function getCommentsByUser(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    userId: z.string().uuid(),
  })
  const { userId } = paramsSchema.parse(request.params)

  try {
    const commentsRepository = new PrismaCommentsRepository()
    const usersRepository = new PrismaUsersRepository()
    const getCommentsByUserUseCase = new GetCommentsByUserUseCase(
      commentsRepository,
      usersRepository,
    )

    const comments = await getCommentsByUserUseCase.execute({ userId })

    return reply.status(200).send(comments)
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: 'Usuário não encontrado.' })
    }
    throw err
  }
}