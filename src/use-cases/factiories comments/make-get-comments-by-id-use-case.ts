import { PrismaCommentsRepository } from "@/repositories/prisma/prisma_comments_repositories.js";
import { GetCommentByIdUseCase } from "../comments/get_comments_by_id_use_case.js";


export function makeGetCommentByIdUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const getCommentsById = new GetCommentByIdUseCase(commentsRepository);
  return getCommentsById;
}
