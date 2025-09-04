import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repositories.js";
import { RegisterUserCase } from "../users/register_use_case.js";

export function makeCreateUserUseCase() {
    const usersRepository = new PrismaUsersRepository();

    const createUserUseCase = new RegisterUserCase(
        usersRepository
    );

    return createUserUseCase;
}