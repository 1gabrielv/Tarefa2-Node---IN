import type { Prisma, Usuario } from "../../generated/prisma/index.js";

export interface UserUpdateInput {
    nome?: string | undefined;
    foto?: string | undefined;
    email?: string | undefined;
    senha?: string | undefined;
}

export interface UsersRepository {
    create(data: Prisma.UsuarioCreateInput): Promise<Usuario>;
    findByEmail(email: string): Promise<Usuario | null>;
    findById(userId: string): Promise<Usuario | null>;
    findAll(): Promise<Usuario[]>; 
    delete(id: string): Promise<Usuario | null>;
    update(id: string, data: UserUpdateInput): Promise<Usuario | null>;

    searchMany(query: string, page: number): Promise<Usuario[]>;
}