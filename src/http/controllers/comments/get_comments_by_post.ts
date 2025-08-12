import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma_comments_repositories.js';
import { PrismaPostsRepository } from '@/repositories/prisma/prisma_posts_repositories.js';
import { GetCommentsByPostUseCase } from '@/use-cases/comments/get_comments_by_post_use_case.js';
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';

export async function getCommentsByPost(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    postId: z.string().uuid(),
  })
  const { postId } = paramsSchema.parse(request.params)

  try {
    const commentsRepository = new PrismaCommentsRepository()
    const postsRepository = new PrismaPostsRepository()
    const getCommentsByPostUseCase = new GetCommentsByPostUseCase(
      commentsRepository,
      postsRepository,
    )

    const comments = await getCommentsByPostUseCase.execute({ postId })

    return reply.status(200).send(comments)
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: 'Post não encontrado.' })
    }
    throw err
  }
}