import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaLikesRepository } from '@/repositories/prisma/prisma_likes_repositories.js';
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma_comments_repositories.js';
import { GetLikesByCommentUseCase } from '@/use-cases/likes/get_likes_by_comments_use_case.js';
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';

export async function getLikesByComment(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    commentId: z.string().uuid(),
  })
  const { commentId } = paramsSchema.parse(request.params)

  try {
    const likesRepository = new PrismaLikesRepository()
    const commentsRepository = new PrismaCommentsRepository()
    const getLikesByCommentUseCase = new GetLikesByCommentUseCase(
      likesRepository,
      commentsRepository,
    )

    const likes = await getLikesByCommentUseCase.execute({ commentId })

    return reply.status(200).send(likes)
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: 'Comentário não encontrado.' })
    }
    throw err
  }
}