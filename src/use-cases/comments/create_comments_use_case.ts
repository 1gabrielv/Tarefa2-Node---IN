import type { Comentario } from '../../../generated/prisma/index.js';
import type { CommentsRepository } from '../../repositories/comments_repositories.js';
import type { PostsRepository } from '../../repositories/post_repositories.js';
import { ResourceNotFound_Error } from '../erros/resource_not_found_error.js';

interface CreateCommentUseCaseRequest {
  conteudo: string
  postId: string
  requestingUserId: string
}

export class CreateCommentUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private postsRepository: PostsRepository,
  ) {}

  async execute({
    conteudo,
    postId,
    requestingUserId,
  }: CreateCommentUseCaseRequest): Promise<Comentario> {
    const post = await this.postsRepository.findById(postId)
    if (!post) {
  throw new ResourceNotFound_Error()
    }

    const comment = await this.commentsRepository.create({
      conteudo,
      postId,
      usuarioId: requestingUserId,
    })

    return comment
  }
}