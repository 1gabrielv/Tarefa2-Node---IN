import { hash } from "bcryptjs";
import type { Usuario } from "../../../generated/prisma/index.js";
import type { UsersRepository, UserUpdateInput } from "@/repositories/users_repositories.js";
import { UserNotFoundError } from "@/use-cases/erros/UserNotFoundErro.js";
import { UserAlreadyExistsError } from "@/use-cases/erros/register_users.js";


interface UpdateUserUseCaseRequest {
    userId: string;
    data: UserUpdateInput;
}

export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userId, data }: UpdateUserUseCaseRequest): Promise<Usuario> {
        const userToUpdate = await this.usersRepository.findById(userId);
        if (!userToUpdate) {
            throw new UserNotFoundError();
        }

        if (data.email) {
            const userWithSameEmail = await this.usersRepository.findByEmail(data.email);
            if (userWithSameEmail && userWithSameEmail.id !== userId) {
                throw new UserAlreadyExistsError();
            }
        }

        if (data.senha) {
            data.senha = await hash(data.senha, 6);
        }

        const updatedUser = await this.usersRepository.update(userId, data);

        if (!updatedUser) {
            throw new Error("Falha ao atualizar o usuário.");
        }

        return updatedUser;
    }
}