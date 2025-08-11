import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaLikesRepository } from '../../../repositories/prisma/prisma_likes_repositories.js';
import { DeleteLikeUseCase } from '@/use-cases/likes/delete_like_use_case.js';
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';
import { NotAllowedError } from '@/use-cases/erros/not_allowed_error.js';

export async function deleteLike(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    likeId: z.string().uuid(),
  })

  const { likeId } = paramsSchema.parse(request.params)
  const requestingUserId = request.user.sub

  try {
    const likesRepository = new PrismaLikesRepository()
    const deleteLikeUseCase = new DeleteLikeUseCase(likesRepository)

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