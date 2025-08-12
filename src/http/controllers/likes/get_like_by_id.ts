import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaLikesRepository } from '@/repositories/prisma/prisma_likes_repositories.js';
import { GetLikeByIdUseCase } from '@/use-cases/likes/get_like_by_id_use_case.js';
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';

export async function getLikeById(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    likeId: z.string().uuid(),
  })

  const { likeId } = paramsSchema.parse(request.params)

  try {
    const likesRepository = new PrismaLikesRepository()
    const getLikeByIdUseCase = new GetLikeByIdUseCase(likesRepository)

    const like = await getLikeByIdUseCase.execute({ likeId })

    return reply.status(200).send(like)
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: 'Like não encontrado.' })
    }
    throw err
  }
}