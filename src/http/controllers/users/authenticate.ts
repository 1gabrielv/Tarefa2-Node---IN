// Caminho: src/http/controllers/user/authenticate.ts
import { z } from 'zod';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma_users_repositories.js';
import { AuthenticateUseCase } from '@/use-cases/users/authenticate_user_use_case.js';
import { InvalidCredentialsError } from '@/use-cases/erros/invalid_credentials_error.js';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.string().email(),
    senha: z.string().min(6),
  })
  const { email, senha } = bodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    const { user } = await authenticateUseCase.execute({ email, senha })

    const token = await reply.jwtSign(
      {
        nome: user.nome,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}