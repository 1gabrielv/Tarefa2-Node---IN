import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-jwt.js';
import { createLike } from '../controllers/likes/create_like.js';
import { deleteLike } from '../controllers/likes/delete_like.js'; // -> Importa o novo controller

export async function likesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/likes', createLike)
  app.delete('/likes/:likeId', deleteLike)
}