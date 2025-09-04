import { PrismaCommentsRepository } from "@/repositories/prisma/prisma_comments_repositories.js";
import { PrismaLikesRepository } from "@/repositories/prisma/prisma_likes_repositories.js";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma_posts_repositories.js";
import { CreateLikeUseCase } from "../likes/create_like_use_case.js";

export function makeCreateLikeUseCase(){
    const likesRepository = new PrismaLikesRepository();
    const postsRepository = new PrismaPostsRepository();
    const commentsRepository = new PrismaCommentsRepository();

    const createLikeUseCase = new CreateLikeUseCase(
        likesRepository,
        postsRepository,
        commentsRepository
    );

    return createLikeUseCase;
}