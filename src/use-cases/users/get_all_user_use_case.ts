import type { Usuario } from "../../../generated/prisma/index.js";
import type { UsersRepository } from "@/repositories/users_repositories.js";


export class GetAllUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute(): Promise<Usuario[]> {
        const users = await this.usersRepository.findAll();
        return users;
    }
}