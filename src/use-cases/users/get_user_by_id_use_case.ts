import type { Usuario } from "../../../generated/prisma/index.js";
import type { UsersRepository } from '@/repositories/users_repositories.js';
import { UserNotFoundError } from "../erros/UserNotFoundErro.js";

interface GetUserByIdUseCaseRequest {
    userId: string;
}

export class GetUserByIdUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userId }: GetUserByIdUseCaseRequest): Promise<Usuario> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new UserNotFoundError();
        }

        return user;
    }
}