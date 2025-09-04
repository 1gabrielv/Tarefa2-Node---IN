import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';
import { makeGetLikesByUserUseCase } from '@/use-cases/factiories likes/make-get-like-by-user-use-case.js';

export async function getLikesByUser(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    userId: z.string().uuid(),
  })
  const { userId } = paramsSchema.parse(request.params)

  try {
    const getLikesByUserUseCase = makeGetLikesByUserUseCase()

    const likes = await getLikesByUserUseCase.execute({ userId })

    return reply.status(200).send(likes)
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: 'Usuário não encontrado.' })
    }
    throw err
  }
}