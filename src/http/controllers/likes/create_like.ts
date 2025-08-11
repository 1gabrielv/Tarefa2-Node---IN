import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaLikesRepository } from '../../../repositories/prisma/prisma_likes_repositories.js';
import { PrismaPostsRepository } from '../../../repositories/prisma/prisma_posts_repositories.js';
import { PrismaCommentsRepository } from '../../../repositories/prisma/prisma_comments_repositories.js';
import { CreateLikeUseCase } from '../../../use-cases/likes/create_like_use_case.js';
import { ResourceNotFound_Error } from '../../../use-cases/erros/resource_not_found_error.js';
import { Already_Liked_Error } from '../../../use-cases/erros/already_liked_error.js';

export async function createLike(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z
    .object({
      postId: z.string().uuid().optional(),
      commentId: z.string().uuid().optional(),
    })
    .refine((data) => !!data.postId !== !!data.commentId, {
      message: 'Forneça ou um postId ou um commentId, mas não ambos.',
    })

  const { postId, commentId } = bodySchema.parse(request.body)
  const requestingUserId = request.user.sub

  try {
    const likesRepository = new PrismaLikesRepository()
    const postsRepository = new PrismaPostsRepository()
    const commentsRepository = new PrismaCommentsRepository()
    const createLikeUseCase = new CreateLikeUseCase(
      likesRepository,
      postsRepository,
      commentsRepository,
    )

    const like = await createLikeUseCase.execute({
      requestingUserId,
      postId,
      commentId,
    })

    return reply.status(201).send(like)
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: err.message })
    }
    if (err instanceof Already_Liked_Error) {
      return reply.status(409).send({ message: err.message })
    }
    if (err instanceof Error && err.message.includes('Forneça ou um postId')) {
        return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}