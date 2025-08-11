import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-jwt.js';
import { createComment } from '../controllers/comments/create_comments.js';
// Precisamos importar o novo controller de listagem
import { getAllComments } from '../controllers/comments/get_all_comments.js';
import { deleteComment } from '../controllers/comments/delete_comments.js';

export async function commentsRoutes(app: FastifyInstance) {
  app.get('/comments', getAllComments)

  // As rotas abaixo precisam de autenticação
  app.post('/posts/:postId/comments', { onRequest: [verifyJwt] }, createComment)
  app.delete('/comments/:commentId', { onRequest: [verifyJwt] }, deleteComment)
}