import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';
import { makeGetLikeByCommentUseCase } from '@/use-cases/factiories likes/make-get-like-by-comment-use-case.js';

export async function getLikesByComment(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    commentId: z.string().uuid(),
  })
  const { commentId } = paramsSchema.parse(request.params)

  try {
    const getLikesByCommentUseCase = makeGetLikeByCommentUseCase()

    const likes = await getLikesByCommentUseCase.execute({ commentId })

    return reply.status(200).send(likes)
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: 'Comentário não encontrado.' })
    }
    throw err
  }
}