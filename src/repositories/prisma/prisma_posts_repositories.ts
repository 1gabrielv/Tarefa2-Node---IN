import prisma from "@/lib/prisma.js";
import { Prisma, type Post } from "../../../generated/prisma/index.js";
import type { PostsRepository, PostUpdateInput } from "../post_repositories.js";

export class PrismaPostsRepository implements PostsRepository {
   
    async create(data: Prisma.PostCreateInput) {
        const post = await prisma.post.create({ data });
        return post;
    }
    
   
    async findAll() {
        return prisma.post.findMany({
            include: { usuario: true },
            orderBy: { createdAt: 'desc' }
        });
    }

    
    async findManyByUserId(userId: string) {
        return prisma.post.findMany({
            where: { usuarioId: userId },
            orderBy: { createdAt: 'desc' }
        });
    }
    
    async findById(postId: string) {
        return prisma.post.findUnique({
            where: { id: postId },
            include: { usuario: true } 
        });
    }

    async delete(id: string) {
        return prisma.post.delete({
            where: { id }
        });
    }

    
    async update(id: string, data: PostUpdateInput) {
        const prismaData: Record<string, any> = {};
        if (data.titulo !== undefined) prismaData.titulo = { set: data.titulo };
        if (data.conteudo !== undefined) prismaData.conteudo = { set: data.conteudo };
        return prisma.post.update({
            where: { id },
            data: prismaData
        });
    }
}