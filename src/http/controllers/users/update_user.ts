import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { UserNotFoundError } from '@/use-cases/erros/UserNotFoundErro.js';
import { UserAlreadyExistsError } from '@/use-cases/erros/register_users.js';
import { NotAllowedError } from '@/use-cases/erros/not_allowed_error.js';
import { makeUpdateUserUseCase } from "@/use-cases/factiories users/make-update-use-case.js";

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({ id: z.string().uuid() });
    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
        nome: z.string().optional(),
        foto: z.string().url().optional(),
        email: z.string().email().optional(),
        senha: z.string().min(6).optional(),
    });
    const data = bodySchema.parse(request.body);

    try {
        const updateUser = makeUpdateUserUseCase();

        const updatedUser = await updateUser.execute({
            userIdToUpdate: id,
            requestingUserId: request.user.sub,
            data,
        });

        return reply.status(200).send(updatedUser);

    } catch (err) {
        if (err instanceof UserNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }
        if (err instanceof NotAllowedError) {
            return reply.status(403).send({ message: err.message });
        }
        throw err;
    }
}