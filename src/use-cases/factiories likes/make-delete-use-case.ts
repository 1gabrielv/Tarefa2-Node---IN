import { PrismaLikesRepository } from "@/repositories/prisma/prisma_likes_repositories.js";
import { DeleteLikeUseCase } from "../likes/delete_like_use_case.js";

export function makeDeleteLikeUseCase() {
    const likesRepository = new PrismaLikesRepository();

    const deleteLikeUseCase = new DeleteLikeUseCase(
        likesRepository,
    );

    return deleteLikeUseCase;
}