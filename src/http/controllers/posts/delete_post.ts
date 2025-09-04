import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { PostNotFoundError } from '@/use-cases/erros/post_not_found_error.js';
import { NotAllowedError } from '@/use-cases/erros/not_allowed_error.js';
import { makeDeletePostUseCase } from "@/use-cases/factiories posts/make-delete-use-case.js";

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
        const deletePostUseCase = makeDeletePostUseCase();

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