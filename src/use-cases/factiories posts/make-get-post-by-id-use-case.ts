import { PrismaPostsRepository } from "@/repositories/prisma/prisma_posts_repositories.js";
import { GetPostByIdUseCase } from "../posts/get_post_by_id_use_case.js";

export function makeGetPostByIdUseCase() {
    const postsRepository = new PrismaPostsRepository();

    const getPostByIdUseCase = new GetPostByIdUseCase(
        postsRepository
    );

    return getPostByIdUseCase;
}