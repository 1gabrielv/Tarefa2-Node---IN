import { z } from 'zod';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma_comments_repositories.js';
import { DeleteCommentUseCase } from '@/use-cases/comments/delete_comment_use_case.js';
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';
import { NotAllowedError } from '@/use-cases/erros/not_allowed_error.js';

export async function deleteComment(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    commentId: z.string().uuid(),
  });

  const { commentId } = paramsSchema.parse(request.params);
  const requestingUserId = request.user.sub;

  try {
    const commentsRepository = new PrismaCommentsRepository();
    const deleteCommentUseCase = new DeleteCommentUseCase(commentsRepository);

    await deleteCommentUseCase.execute({ commentId, requestingUserId });

    return reply.status(200).send({ message: 'Comentário deletado com sucesso.' });
  } catch (err) {
    if (err instanceof ResourceNotFound_Error) {
      return reply.status(404).send({ message: 'Comentário não encontrado.' });
    }
    if (err instanceof NotAllowedError) {
      return reply.status(403).send({ message: 'Ação não permitida.' });
    }
    throw err;
  }
}
