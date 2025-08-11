// Caminho do arquivo: src/http/routes/posts.ts

import type { FastifyInstance } from "fastify";

import { verifyJwt } from "../middlewares/verify-jwt.js";
import { createPost } from "../controllers/posts/create_post.js";
import { getAllPosts } from "../controllers/posts/get_all_post.js";
import { getPostById } from "../controllers/posts/get_post_by_id.js";
import { getPostsByUser } from "../controllers/posts/get_post_by_user.js";
import { updatePost } from "../controllers/posts/update_post.js";
import { deletePost } from "../controllers/posts/delete_post.js";

export async function postsRoutes(app: FastifyInstance) {
    // --- Rotas Públicas ---
    app.get('/posts', getAllPosts);
    app.get('/posts/:id', getPostById);
    app.get('/users/:userId/posts', getPostsByUser);


    // --- Rotas Autenticadas (*) ---
    app.post('/posts', { onRequest: [verifyJwt] }, createPost);
    app.put('/posts/:id', { onRequest: [verifyJwt] }, updatePost);
    app.patch('/posts/:id', { onRequest: [verifyJwt] }, updatePost);
    app.delete('/posts/:id', { onRequest: [verifyJwt] }, deletePost);
}