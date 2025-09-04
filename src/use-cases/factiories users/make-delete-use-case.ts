import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repositories.js";
import { DeleteUserUseCase } from "../users/delete_user_use_case.js";

export function makeDeleteUserUseCase() {
    const usersRepository = new PrismaUsersRepository();

    const deleteUserUseCase = new DeleteUserUseCase(
        usersRepository
    );

    return deleteUserUseCase;
}
