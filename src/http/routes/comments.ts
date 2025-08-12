import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-jwt.js';
import { createComment } from '../controllers/comments/create_comments.js';
import { getAllComments } from '../controllers/comments/get_all_comments.js';
import { getCommentById } from '../controllers/comments/get_comments_by_id.js';
import { deleteComment } from '../controllers/comments/delete_comments.js';
import { getCommentsByUser } from '../controllers/comments/get_comments_by_user.js';
import { getCommentsByPost } from '../controllers/comments/get_comments_by_post.js';

export async function commentsRoutes(app: FastifyInstance) {
  /**
   * Rotas Públicas
   */
  app.get('/comments', getAllComments)
  app.get('/comments/:commentId', getCommentById)
  app.get('/users/:userId/comments', getCommentsByUser)
  app.get('/posts/:postId/comments', getCommentsByPost)

  /**
   * Rotas Autenticadas
   */
  app.post('/posts/:postId/comments', { onRequest: [verifyJwt] }, createComment)
  app.delete('/comments/:commentId', { onRequest: [verifyJwt] }, deleteComment)
}