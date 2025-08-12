import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaLikesRepository } from '@/repositories/prisma/prisma_likes_repositories.js';
import { PrismaPostsRepository } from '@/repositories/prisma/prisma_posts_repositories.js';
import { GetLikesByPostUseCase } from '@/use-cases/likes/get_likes_by_post_use_case.js';
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';

export async function getLikesByPost(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    postId: z.string().uuid(),
  })
  const { postId } = paramsSchema.parse(request.params)

  try {
    const likesRepository = new PrismaLikesRepository()
    const postsRepository = new PrismaPostsRepository()
    const getLikesByPostUseCase = new GetLikesByPostUseCase(
      likesRepository,
      postsRepository,
    )

    const likes = await getLikesByPostUseCase.execute({ postId })

    return reply.status(200).send(likes)
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: 'Post não encontrado.' })
    }
    throw err
  }
}