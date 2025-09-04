import { PrismaCommentsRepository } from "@/repositories/prisma/prisma_comments_repositories.js";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma_posts_repositories.js";
import { CreateCommentUseCase } from "../comments/create_comments_use_case.js";

export function makeCreateCommentUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const postsRepository = new PrismaPostsRepository();

  const createCommentUseCase = new CreateCommentUseCase(
    commentsRepository,
    postsRepository,
  );

  return createCommentUseCase;
}
