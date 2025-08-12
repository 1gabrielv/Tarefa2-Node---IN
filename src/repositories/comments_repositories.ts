import { Prisma, type Comentario } from '../../generated/prisma/index.js';

export interface CommentsRepository {
  create(data: Prisma.ComentarioUncheckedCreateInput): Promise<Comentario>
  findById(id: string): Promise<Comentario | null>
  findAll(): Promise<Comentario[]>
  delete(id: string): Promise<void>
  findManyByUserId(userId: string): Promise<Comentario[]>
  findManyByPostId(postId: string): Promise<Comentario[]> 
}