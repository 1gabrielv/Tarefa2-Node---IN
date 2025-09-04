import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetAllUsersUseCase } from "@/use-cases/factiories users/make-get-all-users-use-case.js";

export async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
        
        const getAllUsersUseCase = makeGetAllUsersUseCase();

        const users = await getAllUsersUseCase.execute();

        return reply.status(200).send(users);
        
    } catch (err) {
        
        return reply.status(500).send({ message: "Erro interno do servidor." });
    }
}