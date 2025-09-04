import { PrismaPostsRepository } from "@/repositories/prisma/prisma_posts_repositories.js";
import { GetAllPostsUseCase } from "../posts/get_all_post_use_case.js";

export function makeGetAllPostsUseCase() {
    const postsRepository = new PrismaPostsRepository();

    const getAllPostsUseCase = new GetAllPostsUseCase(
        postsRepository
    );

    return getAllPostsUseCase; 
}