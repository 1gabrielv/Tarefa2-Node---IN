import type { Like } from '../../../generated/prisma/index.js';
import type { LikesRepository } from '@/repositories/likes_repositories.js';
import type { PostsRepository } from '@/repositories/post_repositories.js';
import { ResourceNotFound_Error } from '../erros/resource_not_found_error.js';

interface GetLikesByPostUseCaseRequest {
  postId: string
}

export class GetLikesByPostUseCase {
  constructor(
    private likesRepository: LikesRepository,
    private postsRepository: PostsRepository,
  ) {}

  async execute({ postId }: GetLikesByPostUseCaseRequest): Promise<Like[]> {
    const post = await this.postsRepository.findById(postId)
    if (!post) {
  throw new ResourceNotFound_Error();
    }

    const likes = await this.likesRepository.findManyByPostId(postId)
    return likes
  }
}