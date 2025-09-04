import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';
import { NotAllowedError } from '@/use-cases/erros/not_allowed_error.js';
import { makeDeleteLikeUseCase } from '@/use-cases/factiories likes/make-delete-use-case.js';

export async function deleteLike(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    likeId: z.string().uuid(),
  })

  const { likeId } = paramsSchema.parse(request.params)
  const requestingUserId = request.user.sub

  try {
    const deleteLikeUseCase = makeDeleteLikeUseCase();

    await deleteLikeUseCase.execute({ likeId, requestingUserId })

    return reply.status(200).send({ message: 'Like removido com sucesso.' })
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: 'Like não encontrado.' })
    }
    if (err instanceof NotAllowedError) {
      return reply.status(403).send({ message: 'Ação não permitida.' })
    }
    throw err
  }
}