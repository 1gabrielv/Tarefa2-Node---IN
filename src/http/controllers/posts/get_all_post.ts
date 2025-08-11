import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostsRepository } from "../../../repositories/prisma/prisma_posts_repositories.js";
import { GetAllPostsUseCase } from "../../../use-cases/posts/get_all_post_use_case.js";

export async function getAllPosts(request: FastifyRequest, reply: FastifyReply) {
    try {
        const postsRepository = new PrismaPostsRepository();
        const getAllPostsUseCase = new GetAllPostsUseCase(postsRepository);

        const posts = await getAllPostsUseCase.execute();

        return reply.status(200).send(posts);
        
    } catch (err) {
        
        return reply.status(500).send({ message: "Erro interno do servidor." });
    }
}