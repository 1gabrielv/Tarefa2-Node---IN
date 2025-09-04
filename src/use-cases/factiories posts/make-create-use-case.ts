import { PrismaPostsRepository } from "@/repositories/prisma/prisma_posts_repositories.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repositories.js";
import { CreatePostUseCase } from "../posts/create_post_use_case.js";

export function makeCreatePostUseCase() {
    const postsRepository = new PrismaPostsRepository();
    const userRepository = new PrismaUsersRepository();

    const createPostUseCase = new CreatePostUseCase(
        postsRepository,
        userRepository
    );

    return createPostUseCase;
}