import type { Post } from "../../../generated/prisma/index.js";
import type { PostsRepository } from "@/repositories/post_repositories.js";
import type { UsersRepository } from "@/repositories/users_repositories.js";
import { UserNotFoundError } from "../erros/UserNotFoundErro.js";

interface CreatePostUseCaseRequest {
    titulo: string;
    conteudo: string;
    usuarioId: string;
}

export class CreatePostUseCase {

    constructor(
        private postsRepository: PostsRepository,
        private usersRepository: UsersRepository,
    ) {}



async execute({ titulo, conteudo, usuarioId }: CreatePostUseCaseRequest): Promise<Post> {
   
    const user = await this.usersRepository.findById(usuarioId);
    if (!user) {
        throw new UserNotFoundError();
    }

  
    const post = await this.postsRepository.create({
        
        titulo: titulo,
        conteudo: conteudo,

       
        createdAt: new Date(),

        
        usuario: {
            connect: {
                id: usuarioId
            }
        }
    });

    return post;
    }
}