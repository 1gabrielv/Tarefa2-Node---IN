import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaLikesRepository } from '@/repositories/prisma/prisma_likes_repositories.js';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma_users_repositories.js';
import { GetLikesByUserUseCase } from '@/use-cases/likes/get_likes_by_user_use_case.js';
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';

export async function getLikesByUser(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    userId: z.string().uuid(),
  })
  const { userId } = paramsSchema.parse(request.params)

  try {
    const likesRepository = new PrismaLikesRepository()
    const usersRepository = new PrismaUsersRepository()
    const getLikesByUserUseCase = new GetLikesByUserUseCase(
      likesRepository,
      usersRepository,
    )

    const likes = await getLikesByUserUseCase.execute({ userId })

    return reply.status(200).send(likes)
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: 'Usuário não encontrado.' })
    }
    throw err
  }
}