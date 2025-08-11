import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostsRepository } from '@/repositories/prisma/prisma_posts_repositories.js';
import { DeletePostUseCase } from '@/use-cases/posts/delete_post_use_case.js';
import { PostNotFoundError } from '@/use-cases/erros/post_not_found_error.js';
import { NotAllowedError } from '@/use-cases/erros/not_allowed_error.js';

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
        const postsRepository = new PrismaPostsRepository();
        const deletePostUseCase = new DeletePostUseCase(postsRepository);

        await deletePostUseCase.execute({
            postId: id,
            requestingUserId: request.user.sub,
        });

        return reply.status(200).send({ message: "Post deletado com sucesso." });

    } catch (err) {
        if (err instanceof PostNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        if (err instanceof NotAllowedError) {
            return reply.status(403).send({ message: err.message });
        }

        throw err;
    }
}