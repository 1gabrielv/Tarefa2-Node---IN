import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma_users_repositories.js";
import { RegisterUserCase } from "../../../use-cases/users/register_use_case.js";
import { UserAlreadyExistsError } from "../../../use-cases/erros/register_users.js";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string(),
        foto: z.string().url(), 
        email: z.string().email(),
        senha: z.string().min(6),
    });

    const { nome, foto, email, senha } = registerBodySchema.parse(request.body);

    try {
     
        const usersRepository = new PrismaUsersRepository();
        const registerUseCase = new RegisterUserCase(usersRepository);

        await registerUseCase.execute({ nome, foto, email, senha });

    } catch (err) {
       
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }
        throw err; 
    }

    return reply.status(201).send({ message: "Usuário criado com sucesso!" });
}