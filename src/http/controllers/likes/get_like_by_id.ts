import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';
import { makeGetLikeByIdUseCase } from '@/use-cases/factiories likes/make-get-like-by-id-use-case.js';

export async function getLikeById(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    likeId: z.string().uuid(),
  })

  const { likeId } = paramsSchema.parse(request.params)

  try {
    const getLikeByIdUseCase = makeGetLikeByIdUseCase();

    const like = await getLikeByIdUseCase.execute({ likeId })

    return reply.status(200).send(like)
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: 'Like não encontrado.' })
    }
    throw err
  }
}