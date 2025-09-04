import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';
import { makeGetCommentByPostUseCase } from '@/use-cases/factiories comments/make-get-comments-by-post-use-case.js';

export async function getCommentsByPost(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    postId: z.string().uuid(),
  })
  const { postId } = paramsSchema.parse(request.params)

  try {
  const getCommentsByPostUseCase = makeGetCommentByPostUseCase()

  const comments = await getCommentsByPostUseCase.execute({ postId })

    return reply.status(200).send(comments)
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: 'Post não encontrado.' })
    }
    throw err
  }
}