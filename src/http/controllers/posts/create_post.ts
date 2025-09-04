import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { UserNotFoundError } from "@/use-cases/erros/UserNotFoundErro.js";
import { makeCreatePostUseCase } from "@/use-cases/factiories posts/make-create-use-case.js";

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
    const createPostBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),
    });

    const { titulo, conteudo } = createPostBodySchema.parse(request.body);

    try {
        const createPostUseCase = makeCreatePostUseCase();

        await createPostUseCase.execute({ 
            titulo, 
            conteudo, 
            usuarioId: request.user.sub,
        });

    } catch (err) {
        if (err instanceof UserNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }

    return reply.status(201).send({ message: "Post criado com sucesso!" });
}
