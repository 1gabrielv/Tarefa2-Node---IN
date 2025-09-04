import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { UserNotFoundError } from "@/use-cases/erros/UserNotFoundErro.js";
import { makeGetPostByUserUseCase } from "@/use-cases/factiories posts/make-get-post-by-user-use-case.js";

export async function getPostsByUser(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({ userId: z.string().uuid() });
    const { userId } = paramsSchema.parse(request.params);

    try {
        const getPostsByUserUseCase = makeGetPostByUserUseCase();

        const posts = await getPostsByUserUseCase.execute({ userId });

        return reply.status(200).send(posts);

    } catch (err) {
        if (err instanceof UserNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}