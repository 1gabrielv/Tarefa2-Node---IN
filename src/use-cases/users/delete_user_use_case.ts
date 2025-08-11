import type { UsersRepository } from "@/repositories/users_repositories.js";
import { UserNotFoundError } from "../erros/UserNotFoundErro.js";

interface DeleteUserUseCaseRequest {
    userId: string;
}

export class DeleteUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userId }: DeleteUserUseCaseRequest): Promise<void> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new UserNotFoundError();
        }

        await this.usersRepository.delete(userId);
    }
}