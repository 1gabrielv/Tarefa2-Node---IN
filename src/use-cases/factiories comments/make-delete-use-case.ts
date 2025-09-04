import { PrismaCommentsRepository } from "@/repositories/prisma/prisma_comments_repositories.js";
import { DeleteCommentUseCase } from "../comments/delete_comment_use_case.js";


export function makeDeleteCommentUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const deleteCommentUseCase = new DeleteCommentUseCase(commentsRepository);

  return deleteCommentUseCase;
}
