import type { Post } from "../../../generated/prisma/index.js";
import type { PostsRepository } from "@/repositories/post_repositories.js";

export class GetAllPostsUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute(): Promise<Post[]> {
        const posts = await this.postsRepository.findAll();
        return posts;
    }
}