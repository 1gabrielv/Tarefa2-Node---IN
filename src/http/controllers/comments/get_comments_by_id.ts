import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma_comments_repositories.js';
import { GetCommentByIdUseCase } from '@/use-cases/comments/get_comments_by_id_use_case.js';
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';

export async function getCommentById(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    commentId: z.string().uuid(),
  })

  const { commentId } = paramsSchema.parse(request.params)

  try {
    const commentsRepository = new PrismaCommentsRepository()
    const getCommentByIdUseCase = new GetCommentByIdUseCase(commentsRepository)

    const comment = await getCommentByIdUseCase.execute({ commentId })

    return reply.status(200).send(comment)
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: 'Comentário não encontrado.' })
    }
    throw err
  }
}