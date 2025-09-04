import { z } from 'zod';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { InvalidCredentialsError } from '@/use-cases/erros/invalid_credentials_error.js';
import { makeAuthenticateUserUseCase } from '@/use-cases/factiories users/make-authenticate-use-case.js';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.string().email(),
    senha: z.string().min(6),
  })
  const { email, senha } = bodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUserUseCase();

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