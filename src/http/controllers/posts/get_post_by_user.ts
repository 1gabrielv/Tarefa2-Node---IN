import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma_posts_repositories.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repositories.js";
import { GetPostsByUserUseCase } from "@/use-cases/posts/get_post_by_user_use_case.js";
import { UserNotFoundError } from "@/use-cases/erros/UserNotFoundErro.js";

export async function getPostsByUser(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({ userId: z.string().uuid() });
    const { userId } = paramsSchema.parse(request.params);

    try {
        const postsRepository = new PrismaPostsRepository();
        const usersRepository = new PrismaUsersRepository();
        const getPostsByUserUseCase = new GetPostsByUserUseCase(postsRepository, usersRepository);

        const posts = await getPostsByUserUseCase.execute({ userId });

        return reply.status(200).send(posts);

    } catch (err) {
        if (err instanceof UserNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}