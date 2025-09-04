import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { PostNotFoundError } from "@/use-cases/erros/post_not_found_error.js";
import { makeGetPostByIdUseCase } from "@/use-cases/factiories posts/make-get-post-by-id-use-case.js";

export async function getPostById(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({ id: z.string().uuid() });
    const { id } = paramsSchema.parse(request.params);

    try {
        const getPostByIdUseCase = makeGetPostByIdUseCase()

        const post = await getPostByIdUseCase.execute({ postId: id });

        return reply.status(200).send(post);

    } catch (err) {
        if (err instanceof PostNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}