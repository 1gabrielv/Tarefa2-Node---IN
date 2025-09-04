import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetAllPostsUseCase } from "@/use-cases/factiories posts/make-get-all-posts-use-case.js";

export async function getAllPosts(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getAllPostsUseCase = makeGetAllPostsUseCase();

        const posts = await getAllPostsUseCase.execute();

        return reply.status(200).send(posts);
        
    } catch (err) {
        
        return reply.status(500).send({ message: "Erro interno do servidor." });
    }
}