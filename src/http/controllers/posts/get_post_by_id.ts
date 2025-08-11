import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma_posts_repositories.js";
import { GetPostByIdUseCase } from "@/use-cases/posts/get_post_by_id_use_case.js";
import { PostNotFoundError } from "@/use-cases/erros/post_not_found_error.js";

export async function getPostById(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({ id: z.string().uuid() });
    const { id } = paramsSchema.parse(request.params);

    try {
        const postsRepository = new PrismaPostsRepository();
        const getPostByIdUseCase = new GetPostByIdUseCase(postsRepository);

        const post = await getPostByIdUseCase.execute({ postId: id });

        return reply.status(200).send(post);

    } catch (err) {
        if (err instanceof PostNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}