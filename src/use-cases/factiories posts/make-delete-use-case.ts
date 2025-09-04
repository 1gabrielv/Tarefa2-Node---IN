import { PrismaPostsRepository } from "@/repositories/prisma/prisma_posts_repositories.js";
import { DeletePostUseCase } from "../posts/delete_post_use_case.js";

export function makeDeletePostUseCase() {
    const postsRepository = new PrismaPostsRepository();

    const deletePostUseCase = new DeletePostUseCase(
        postsRepository
    );

    return deletePostUseCase;
}
