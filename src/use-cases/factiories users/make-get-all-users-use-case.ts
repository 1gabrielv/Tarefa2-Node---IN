import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repositories.js";
import { GetAllUsersUseCase } from "../users/get_all_user_use_case.js";

export function makeGetAllUsersUseCase() {
    const usersRepository = new PrismaUsersRepository();

    const getAllUsersUseCase = new GetAllUsersUseCase(
        usersRepository
    );

    return getAllUsersUseCase;
}
