import { PrismaCommentsRepository } from "@/repositories/prisma/prisma_comments_repositories.js";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma_posts_repositories.js";
import { GetCommentsByPostUseCase } from "../comments/get_comments_by_post_use_case.js";


export function makeGetCommentByPostUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const postsRepository = new PrismaPostsRepository();

  const getCommentsByPostUseCase = new GetCommentsByPostUseCase(
    commentsRepository,
    postsRepository,
  );

  return getCommentsByPostUseCase;
}
