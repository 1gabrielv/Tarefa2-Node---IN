import { PrismaPostsRepository } from "@/repositories/prisma/prisma_posts_repositories.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repositories.js";
import { GetPostsByUserUseCase } from "../posts/get_post_by_user_use_case.js";


export function makeGetPostByUserUseCase() {
    const postsRepository = new PrismaPostsRepository();
    const usersRepository = new PrismaUsersRepository();

    const getPostByUserUseCase = new GetPostsByUserUseCase(
        postsRepository,
        usersRepository
    );

    return getPostByUserUseCase;
}