import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "@/use-cases/erros/register_users.js";
import { makeCreateUserUseCase } from "@/use-cases/factiories users/make-create-use-case.js";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string(),
        foto: z.string().url(), 
        email: z.string().email(),
        senha: z.string().min(6),
    });

    const { nome, foto, email, senha } = registerBodySchema.parse(request.body);

    try {
     
        const registerUseCase = makeCreateUserUseCase();

        await registerUseCase.execute({ nome, foto, email, senha });

    } catch (err) {
       
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }
        throw err; 
    }

    return reply.status(201).send({ message: "Usuário criado com sucesso!" });
}