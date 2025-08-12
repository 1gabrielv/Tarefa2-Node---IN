import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-jwt.js';
import { createLike } from '../controllers/likes/create_like.js';
import { deleteLike } from '../controllers/likes/delete_like.js';
import { getLikeById } from '../controllers/likes/get_like_by_id.js';
import { getLikesByUser } from '../controllers/likes/get_like_by_user.js';
import { getLikesByPost } from '../controllers/likes/get_like_by_post.js';
import { getLikesByComment } from '../controllers/likes/get_likes_by_comments.js';

export async function likesRoutes(app: FastifyInstance) {
  /**
   * Rotas Públicas
   */
  app.get('/likes/:likeId', getLikeById)
  app.get('/users/:userId/likes', getLikesByUser) 
  app.get('/posts/:postId/likes', getLikesByPost)   
  app.get('/comments/:commentId/likes', getLikesByComment) 
    
  

  /**
   * Rotas Autenticadas
   */
  app.post('/likes', { onRequest: [verifyJwt] }, createLike)
  app.delete('/likes/:likeId', { onRequest: [verifyJwt] }, deleteLike)
}