import { PrismaLikesRepository } from "@/repositories/prisma/prisma_likes_repositories.js";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma_posts_repositories.js";
import { GetLikesByPostUseCase } from "../likes/get_likes_by_post_use_case.js";

export function makeGetLikeByPostUseCase() {
    const likesRepository = new PrismaLikesRepository();
    const postsRepository = new PrismaPostsRepository();

    const getLikesByPostUseCase = new GetLikesByPostUseCase(
        likesRepository,
        postsRepository,
    );

    return getLikesByPostUseCase;
}