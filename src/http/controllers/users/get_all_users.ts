import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repositories.js";
import { GetAllUsersUseCase } from "@/use-cases/users/get_all_user_use_case.js";

export async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
        
        const usersRepository = new PrismaUsersRepository();
        const getAllUsersUseCase = new GetAllUsersUseCase(usersRepository);

        const users = await getAllUsersUseCase.execute();

        return reply.status(200).send(users);
        
    } catch (err) {
        
        return reply.status(500).send({ message: "Erro interno do servidor." });
    }
}