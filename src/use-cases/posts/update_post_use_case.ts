import type { Post } from "../../../generated/prisma/index.js";
import type { PostsRepository } from "@/repositories/post_repositories.js";
import { PostNotFoundError } from "../erros/post_not_found_error.js";

interface UpdatePostUseCaseRequest {
    postId: string;
    data: {
        titulo?: string | undefined;
        conteudo?: string | undefined;
    };
}

export class UpdatePostUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({ postId, data }: UpdatePostUseCaseRequest): Promise<Post> {
        const postToUpdate = await this.postsRepository.findById(postId);
        if (!postToUpdate) {
            throw new PostNotFoundError();
        }

        const updatedPost = await this.postsRepository.update(postId, data);

        if (!updatedPost) {
            throw new Error("Falha ao atualizar o post.");
        }

        return updatedPost;
    }
}