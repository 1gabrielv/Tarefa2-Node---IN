import { PrismaCommentsRepository } from "@/repositories/prisma/prisma_comments_repositories.js";
import { GetCommentsByUserUseCase } from "../comments/get_comments_by_user_use_case.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repositories.js";


export function makeGetCommentByUserUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const usersRepository = new PrismaUsersRepository();

  const getCommentsByUserUseCase = new GetCommentsByUserUseCase(
    commentsRepository,
    usersRepository
  );

  return getCommentsByUserUseCase;
}
