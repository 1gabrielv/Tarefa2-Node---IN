import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';
import { makeGetCommentByUserUseCase } from '@/use-cases/factiories comments/make-get-comments-by-user-use-case.js';

export async function getCommentsByUser(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    userId: z.string().uuid(),
  })
  const { userId } = paramsSchema.parse(request.params)

  try {
    const getCommentsByUserUseCase = makeGetCommentByUserUseCase()

    const comments = await getCommentsByUserUseCase.execute({ userId })

    return reply.status(200).send(comments)
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: 'Usuário não encontrado.' })
    }
    throw err
  }
}