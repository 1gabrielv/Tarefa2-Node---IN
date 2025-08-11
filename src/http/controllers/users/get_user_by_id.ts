import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma_users_repositories.js";
import { GetUserByIdUseCase } from "../../../use-cases/users/get_user_by_id_use_case.js";
import { UserNotFoundError } from "../../../use-cases/erros/UserNotFoundErro.js";

export async function getUserById(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({ id: z.string().uuid() });
    const { id } = paramsSchema.parse(request.params);

    try {
        const usersRepository = new PrismaUsersRepository();
        const getUserByIdUseCase = new GetUserByIdUseCase(usersRepository);

        const user = await getUserByIdUseCase.execute({ userId: id });

        return reply.status(200).send(user);

    } catch (err) {
        if (err instanceof UserNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}