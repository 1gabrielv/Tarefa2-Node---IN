import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repositories.js";
import { GetUserByIdUseCase } from "../users/get_user_by_id_use_case.js";

export function makeGetUserByIdUseCase() {
    const usersRepository = new PrismaUsersRepository();

    const getUserByIdUseCase = new GetUserByIdUseCase(
        usersRepository
    );

    return getUserByIdUseCase;
}
