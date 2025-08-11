import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaCommentsRepository } from '../../../repositories/prisma/prisma_comments_repositories.js';
import { PrismaPostsRepository } from '../../../repositories/prisma/prisma_posts_repositories.js';
import { CreateCommentUseCase } from '../../../use-cases/comments/create_comments_use_case.js';
import { ResourceNotFound_Error } from '../../../use-cases/erros/resource_not_found_error.js';

export async function createComment(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    postId: z.string().uuid(),
  })
  const bodySchema = z.object({
    conteudo: z.string(),
  })

  const { postId } = paramsSchema.parse(request.params)
  const { conteudo } = bodySchema.parse(request.body)
  const requestingUserId = request.user.sub

  try {
    const commentsRepository = new PrismaCommentsRepository()
    const postsRepository = new PrismaPostsRepository()
    const createCommentUseCase = new CreateCommentUseCase(
      commentsRepository,
      postsRepository,
    )

    const comment = await createCommentUseCase.execute({
      conteudo,
      postId,
      requestingUserId,
    })

    return reply.status(201).send(comment)
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: 'Post não encontrado.' })
    }
    throw err
  }
}