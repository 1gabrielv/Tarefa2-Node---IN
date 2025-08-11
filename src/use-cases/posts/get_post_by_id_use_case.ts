import type { Post } from "../../../generated/prisma/index.js";
import type { PostsRepository } from "@/repositories/post_repositories.js";
import { PostNotFoundError } from "../erros/post_not_found_error.js";

interface GetPostByIdUseCaseRequest {
    postId: string;
}

export class GetPostByIdUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({ postId }: GetPostByIdUseCaseRequest): Promise<Post> {
        const post = await this.postsRepository.findById(postId);

        if (!post) {
            throw new PostNotFoundError();
        }

        return post;
    }
}