import type { Prisma, Post } from "../../generated/prisma/index.js";

export interface PostUpdateInput {
    titulo?: string | undefined;
    conteudo?: string | undefined;
}

export interface PostsRepository {
    create(data: Prisma.PostCreateInput): Promise<Post>;
    findById(postId: string): Promise<Post | null>;
    findAll(): Promise<Post[]>;
    findManyByUserId(userId: string): Promise<Post[]>; 
    delete(id: string): Promise<Post | null>;
    update(id: string, data: PostUpdateInput): Promise<Post | null>;
}