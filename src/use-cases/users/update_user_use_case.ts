import { hash } from "bcryptjs";
import type { Usuario } from "../../../generated/prisma/index.js";
import type { UsersRepository, UserUpdateInput } from "../../repositories/users_repositories.js";
import { UserNotFoundError } from "../erros/UserNotFoundErro.js";
import { UserAlreadyExistsError } from "../erros/register_users.js";
import { NotAllowedError } from "../erros/not_allowed_error.js";

interface UpdateUserUseCaseRequest {
    userIdToUpdate: string;   
    requestingUserId: string; 
    data: UserUpdateInput;
}

export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userIdToUpdate, requestingUserId, data }: UpdateUserUseCaseRequest): Promise<Usuario> {
        if (userIdToUpdate !== requestingUserId) {
            throw new NotAllowedError();
        }

        const userToUpdate = await this.usersRepository.findById(userIdToUpdate);
        if (!userToUpdate) {
            throw new UserNotFoundError();
        }

        if (data.email) {
            const userWithSameEmail = await this.usersRepository.findByEmail(data.email);
            if (userWithSameEmail && userWithSameEmail.id !== userIdToUpdate) {
                throw new UserAlreadyExistsError();
            }
        }

        if (data.senha) {
            data.senha = await hash(data.senha, 6);
        }

        const updatedUser = await this.usersRepository.update(userIdToUpdate, data);
        if (!updatedUser) {
            throw new Error("Falha ao atualizar o usuário.");
        }

        return updatedUser;
    }
}