import { PrismaLikesRepository } from "@/repositories/prisma/prisma_likes_repositories.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repositories.js";
import { GetLikesByUserUseCase } from "../likes/get_likes_by_user_use_case.js";

export function makeGetLikesByUserUseCase() {
    const likesRepository = new PrismaLikesRepository();
    const usersRepository = new PrismaUsersRepository();

    const getLikesByUserUseCase = new GetLikesByUserUseCase(
        likesRepository,
        usersRepository,
    );

    return getLikesByUserUseCase;
}