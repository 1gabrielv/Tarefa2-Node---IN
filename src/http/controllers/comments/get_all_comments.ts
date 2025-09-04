import type { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma_comments_repositories.js';
import { GetAllCommentsUseCase } from '@/use-cases/comments/get_all_comments_use_case.js';
import { makeGetAllCommentsUseCase } from '@/use-cases/factiories comments/make-get-all-comments-use-case copy.js';

export async function getAllComments(request: FastifyRequest, reply: FastifyReply) {
  try {
    const commentsRepository = makeGetAllCommentsUseCase()

    const comments = await commentsRepository.execute()

    return reply.status(200).send(comments)
  } catch (err) {
    return reply.status(500).send({ message: 'Erro interno do servidor.' })
  }
}