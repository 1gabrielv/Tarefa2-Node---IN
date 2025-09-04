import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { UserNotFoundError } from "@/use-cases/erros/UserNotFoundErro.js";
import { makeGetUserByIdUseCase } from "@/use-cases/factiories users/make-get-user-by-id-use-case.js";

export async function getUserById(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({ id: z.string().uuid() });
    const { id } = paramsSchema.parse(request.params);

    try {
        const getUserByIdUseCase = makeGetUserByIdUseCase();

        const user = await getUserByIdUseCase.execute({ userId: id });

        return reply.status(200).send(user);

    } catch (err) {
        if (err instanceof UserNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}