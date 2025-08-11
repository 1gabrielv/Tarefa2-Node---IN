import type { Usuario } from "../../../generated/prisma/index.js";
import type { UsersRepository } from '@/repositories/users_repositories.js'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../erros/invalid_credentials_error.js'

interface AuthenticateUseCaseRequest {
  email: string
  senha: string
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, senha }: AuthenticateUseCaseRequest): Promise<{ user: Usuario }> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(senha, user.senha)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}