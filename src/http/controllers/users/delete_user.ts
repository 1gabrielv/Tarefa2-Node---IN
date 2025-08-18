import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repositories.js";
import { DeleteUserUseCase } from "@/use-cases/users/delete_user_use_case.js";
import { UserNotFoundError } from "@/use-cases/erros/UserNotFoundErro.js";
import { NotAllowedError } from "@/use-cases/erros/not_allowed_error.js";  

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
        const usersRepository = new PrismaUsersRepository();
        const deleteUserUseCase = new DeleteUserUseCase(usersRepository);

        await deleteUserUseCase.execute({
            userIdToDelete: id,
            requestingUserId: request.user.sub,
        });

        return reply.status(200).send({ message: "Usuário deletado com sucesso." });

    } catch (err) {
        if (err instanceof UserNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        if (err instanceof NotAllowedError) {
            return reply.status(403).send({ message: err.message });
        }

        throw err;
    }
}