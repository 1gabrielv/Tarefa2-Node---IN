import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from '@/repositories/prisma/prisma_users_repositories.js';
import { UpdateUserUseCase } from '@/use-cases/users/update_user_use_case.js';
import { UserNotFoundError } from '@/use-cases/erros/UserNotFoundErro.js';
import { UserAlreadyExistsError } from '@/use-cases/erros/register_users.js';
import { NotAllowedError } from '@/use-cases/erros/not_allowed_error.js';

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
        const usersRepository = new PrismaUsersRepository();
        const updateUserUseCase = new UpdateUserUseCase(usersRepository);

        const updatedUser = await updateUserUseCase.execute({
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