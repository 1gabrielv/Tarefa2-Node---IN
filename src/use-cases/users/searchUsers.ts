import type { UsersRepository } from '@/repositories/users_repositories.js';
import type { Usuario } from 'generated/prisma/index.js';

interface SearchUserUseCaseRequest {
    query: string;
    page: number;
} 

interface SearchUserUseCaseResponse {
    users: Usuario[];
} 
 

export class SearchUserUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute({ query, page }: SearchUserUseCaseRequest): Promise<SearchUserUseCaseResponse> {

    const users = await this.usersRepository.searchMany(
        query,
        page
    );

    return { users };
    }
}