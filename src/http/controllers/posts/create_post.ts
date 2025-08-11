import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma_posts_repositories.js"; 
import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repositories.js";
import { CreatePostUseCase } from "@/use-cases/posts/create_post_use_case.js";
import { UserNotFoundError } from "@/use-cases/erros/UserNotFoundErro.js";

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
    const createPostBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),
    });

    const { titulo, conteudo } = createPostBodySchema.parse(request.body);

    try {
        const postsRepository = new PrismaPostsRepository();
        const usersRepository = new PrismaUsersRepository();
        const createPostUseCase = new CreatePostUseCase(postsRepository, usersRepository);

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
