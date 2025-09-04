import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';
import { makeGetLikeByPostUseCase } from '@/use-cases/factiories likes/make-get-like-by-post-use-case.js';

export async function getLikesByPost(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    postId: z.string().uuid(),
  })
  const { postId } = paramsSchema.parse(request.params)

  try {
    const getLikesByPostUseCase = makeGetLikeByPostUseCase()

    const likes = await getLikesByPostUseCase.execute({ postId })

    return reply.status(200).send(likes)
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: 'Post não encontrado.' })
    }
    throw err
  }
}