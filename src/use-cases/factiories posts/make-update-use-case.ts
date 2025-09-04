import { PrismaPostsRepository } from "@/repositories/prisma/prisma_posts_repositories.js";
import { UpdatePostUseCase } from "../posts/update_post_use_case.js";

export function makeUpdatePostUseCase() {
    const postsRepository = new PrismaPostsRepository();

    const updatePostUseCase = new UpdatePostUseCase(
        postsRepository
    );

    return updatePostUseCase;
}