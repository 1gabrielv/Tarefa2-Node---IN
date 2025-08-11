import type { PostsRepository } from "@/repositories/post_repositories.js";
import { PostNotFoundError } from "../erros/post_not_found_error.js";

interface DeletePostUseCaseRequest {
    postId: string;
}

export class DeletePostUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({ postId }: DeletePostUseCaseRequest): Promise<void> {
        const post = await this.postsRepository.findById(postId);

        if (!post) {
            throw new PostNotFoundError();
        }

        await this.postsRepository.delete(postId);
    }
}