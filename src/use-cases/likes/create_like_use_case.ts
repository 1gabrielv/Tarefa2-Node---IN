import type { Like } from '../../../generated/prisma/index.js';
import type { LikesRepository } from '@/repositories/likes_repositories.js';
import type { PostsRepository } from '@/repositories/post_repositories.js';
import type { CommentsRepository } from '@/repositories/comments_repositories.js';
import { ResourceNotFound_Error } from '../erros/resource_not_found_error.js';
import { Already_Liked_Error } from '../erros/already_liked_error.js';

interface CreateLikeUseCaseRequest {
  requestingUserId: string;
  postId?: string | undefined;
  commentId?: string | undefined;
}

export class CreateLikeUseCase {
  constructor(
    private likesRepository: LikesRepository,
    private postsRepository: PostsRepository,
    private commentsRepository: CommentsRepository,
  ) {}

  async execute({
    requestingUserId,
    postId,
    commentId,
  }: CreateLikeUseCaseRequest): Promise<Like> {
    if (postId) {
      const post = await this.postsRepository.findById(postId)
      if (!post) {
  throw new ResourceNotFound_Error()
      }

      const alreadyLiked = await this.likesRepository.findUserLikeOnPost(
        requestingUserId,
        postId,
      )
      if (alreadyLiked) {
  throw new Already_Liked_Error()
      }

      return this.likesRepository.create({
        usuarioId: requestingUserId,
        postId: postId,
      })
    }

    if (commentId) {
      const comment = await this.commentsRepository.findById(commentId)
      if (!comment) {
  throw new ResourceNotFound_Error()
      }

      const alreadyLiked = await this.likesRepository.findUserLikeOnComment(
        requestingUserId,
        commentId,
      )
      if (alreadyLiked) {
  throw new Already_Liked_Error()
      }

      return this.likesRepository.create({
        usuarioId: requestingUserId,
        comentarioId: commentId,
      })
    }

    throw new Error('É necessário fornecer um post ou um comentário para curtir.')
  }
}