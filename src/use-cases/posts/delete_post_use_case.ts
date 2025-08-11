// Caminho: src/use-cases/posts/delete_post_use_case.ts

import type { PostsRepository } from "@/repositories/post_repositories.js";
import { PostNotFoundError } from "../erros/post_not_found_error.js";
import { NotAllowedError } from "../erros/not_allowed_error.js";

interface DeletePostUseCaseRequest {
    postId: string;
    requestingUserId: string;
}

export class DeletePostUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({ postId, requestingUserId }: DeletePostUseCaseRequest): Promise<void> {
        const post = await this.postsRepository.findById(postId);

        if (!post) {
            throw new PostNotFoundError();
        }

        if (post.usuarioId !== requestingUserId) {
            throw new NotAllowedError();
        }

        await this.postsRepository.delete(postId);
    }
}