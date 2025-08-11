// Caminho: src/use-cases/post/get-posts-by-user-use-case.ts
import type { Post } from "../../../generated/prisma/index.js";
import type { PostsRepository } from "@/repositories/post_repositories.js";
import type { UsersRepository } from "@/repositories/users_repositories.js";
import { UserNotFoundError } from "../erros/UserNotFoundErro.js";

interface GetPostsByUserUseCaseRequest {
    userId: string;
}

export class GetPostsByUserUseCase {
    constructor(
        private postsRepository: PostsRepository,
        private usersRepository: UsersRepository
    ) {}

    async execute({ userId }: GetPostsByUserUseCaseRequest): Promise<Post[]> {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new UserNotFoundError();
        }

        const posts = await this.postsRepository.findManyByUserId(userId);
        return posts;
    }
}