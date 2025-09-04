import { z } from 'zod';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { makeDeleteCommentUseCase } from '@/use-cases/factiories comments/make-delete-use-case.js';
import { ResourceNotFound_Error } from '@/use-cases/erros/resource_not_found_error.js';
import { NotAllowedError } from '@/use-cases/erros/not_allowed_error.js';

export async function deleteComment(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    commentId: z.string().uuid(),
  });

  const { commentId } = paramsSchema.parse(request.params);
  const requestingUserId = request.user.sub;

  try {
    const commentsRepository = makeDeleteCommentUseCase()

    await commentsRepository.execute({ commentId, requestingUserId });

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
