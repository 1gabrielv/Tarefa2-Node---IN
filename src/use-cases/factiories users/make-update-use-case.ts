import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repositories.js";
import { UpdateUserUseCase } from "../users/update_user_use_case.js";

export function makeUpdateUserUseCase() {
    const usersRepository = new PrismaUsersRepository();

    const updateUserUseCase = new UpdateUserUseCase(
        usersRepository
    );
    return updateUserUseCase;
}