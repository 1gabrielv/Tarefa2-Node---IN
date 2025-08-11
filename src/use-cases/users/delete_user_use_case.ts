
import type { UsersRepository } from "@/repositories/users_repositories.js";
import { UserNotFoundError } from "../erros/UserNotFoundErro.js"; 
import { NotAllowedError } from "../erros/not_allowed_error.js";   

interface DeleteUserUseCaseRequest {
    userIdToDelete: string;
    requestingUserId: string;
}

export class DeleteUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userIdToDelete, requestingUserId }: DeleteUserUseCaseRequest): Promise<void> {
        if (userIdToDelete !== requestingUserId) {
            throw new NotAllowedError();
        }

        const user = await this.usersRepository.findById(userIdToDelete);
        if (!user) {
            throw new UserNotFoundError();
        }

        await this.usersRepository.delete(userIdToDelete);
    }
}