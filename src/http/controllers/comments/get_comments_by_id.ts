import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';
import { makeGetCommentByIdUseCase } from '@/use-cases/factiories comments/make-get-comments-by-id-use-case.js';

export async function getCommentById(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    commentId: z.string().uuid(),
  })

  const { commentId } = paramsSchema.parse(request.params)

  try {
    const commentsRepository = makeGetCommentByIdUseCase()

    const comment = await commentsRepository.execute({ commentId })

    return reply.status(200).send(comment)
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: 'Comentário não encontrado.' })
    }
    throw err
  }
}