import prisma from '@/lib/prisma.js';
import { Prisma, type Usuario } from '../../../generated/prisma/index.js';
import type { UsersRepository, UserUpdateInput } from '../users_repositories.js';

export class PrismaUsersRepository implements UsersRepository {
    
    async findAll() {
        const users = await prisma.usuario.findMany({
            include: { posts: true }
        });
        return users;
    }

    
    async update(id: string, data: UserUpdateInput): Promise<Usuario | null> {
        const prismaData: Record<string, any> = {};
        if (data.nome !== undefined) prismaData.nome = { set: data.nome };
        if (data.foto !== undefined) prismaData.foto = { set: data.foto };
        if (data.email !== undefined) prismaData.email = { set: data.email };
        if (data.senha !== undefined) prismaData.senha = { set: data.senha };

        const user = await prisma.usuario.update({
            where: { id },
            data: prismaData,
        });
        return user;
    }
    
    async delete(id: string): Promise<Usuario | null> {
        const user = await prisma.usuario.delete({
            where: { id }
        });
        return user;
    }

    async findById(userId: string) {
        const user = await prisma.usuario.findUnique({
            where: { id: userId },
            include: { posts: true }
        });
        return user;
    }

    async findByEmail(email: string) {
        const user = await prisma.usuario.findUnique({
            where: { email }
        });
        return user;
    }

    async create(data: Prisma.UsuarioCreateInput) {
        const user = await prisma.usuario.create({
            data
        });
        return user;
    }
}