import { PrismaCommentsRepository } from "@/repositories/prisma/prisma_comments_repositories.js";
import { GetAllCommentsUseCase } from "../comments/get_all_comments_use_case.js";

export function makeGetAllCommentsUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const getAllComments = new GetAllCommentsUseCase(commentsRepository);

  return getAllComments;
}
