import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostsRepository } from '@/repositories/prisma/prisma_posts_repositories.js';
import { UpdatePostUseCase } from '@/use-cases/posts/update_post_use_case.js';
import { PostNotFoundError } from '@/use-cases/erros/post_not_found_error.js';
import { NotAllowedError } from '@/use-cases/erros/not_allowed_error.js';

export async function updatePost(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({ id: z.string().uuid() });
    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
        titulo: z.string().optional(),
        conteudo: z.string().optional(),
    });
    const data = bodySchema.parse(request.body);

    if (Object.keys(data).length === 0) {
        return reply.status(400).send({ message: "Pelo menos um campo (titulo ou conteudo) deve ser fornecido para atualização." });
    }

    try {
        const postsRepository = new PrismaPostsRepository();
        const updatePostUseCase = new UpdatePostUseCase(postsRepository);

        const updatedPost = await updatePostUseCase.execute({
            postId: id,
            requestingUserId: request.user.sub,
            data: {
                titulo: data.titulo ?? undefined,
                conteudo: data.conteudo ?? undefined,
            },
        });

        return reply.status(200).send(updatedPost);

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