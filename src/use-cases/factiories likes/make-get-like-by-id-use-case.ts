import { PrismaLikesRepository } from "@/repositories/prisma/prisma_likes_repositories.js";
import { GetLikeByIdUseCase } from "../likes/get_like_by_id_use_case.js";

export function makeGetLikeByIdUseCase() {
    const likesRepository = new PrismaLikesRepository();

    const getLikeByIdUseCase = new GetLikeByIdUseCase(
        likesRepository,
    );

    return getLikeByIdUseCase;
}