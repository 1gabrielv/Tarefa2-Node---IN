import { PrismaLikesRepository } from "@/repositories/prisma/prisma_likes_repositories.js";
import { PrismaCommentsRepository } from "@/repositories/prisma/prisma_comments_repositories.js";
import { GetLikesByCommentUseCase } from "../likes/get_likes_by_comments_use_case.js";


export function makeGetLikeByCommentUseCase() {
  const likesRepository = new PrismaLikesRepository();
  const commentsRepository = new PrismaCommentsRepository();

  const getLikesByCommentUseCase = new GetLikesByCommentUseCase(
    likesRepository,
    commentsRepository
  );

  return getLikesByCommentUseCase;
}