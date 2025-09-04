import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repositories.js";
import { AuthenticateUseCase } from "../users/authenticate_user_use_case.js";

export function makeAuthenticateUserUseCase() {
    const usersRepository = new PrismaUsersRepository();

    const authenticateUserUseCase = new AuthenticateUseCase(
        usersRepository
    );

    return authenticateUserUseCase;
}