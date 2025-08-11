import { hash } from 'bcryptjs';
import type { UsersRepository } from '@/repositories/users_repositories.js';
import { UserAlreadyExistsError } from '../erros/register_users.js';

interface RegisterUseCaseRequest {
    nome: string;
    foto: string;
    email: string;
    senha: string;
} 
 

export class RegisterUserCase{
    constructor(private usersRepository: UsersRepository){}

    async execute({ nome, foto, email, senha }: RegisterUseCaseRequest){

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if(userWithSameEmail){
        throw new UserAlreadyExistsError();
    }

    const passwordHash = await hash(senha, 6);

    await this.usersRepository.create({
        nome,
        foto,
        email,
        senha: passwordHash
    });
    
}
}