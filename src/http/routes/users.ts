import type { FastifyInstance } from "fastify";

import { verifyJwt } from "../middlewares/verify-jwt.js";
import { register } from "../controllers/users/register.js";
import { authenticate } from "@/http/controllers/users/authenticate.js";
import { getAllUsers } from "../controllers/users/get_all_users.js";
import { getUserById } from "../controllers/users/get_user_by_id.js";
import { updateUser } from "../controllers/users/update_user.js";
import { deleteUser } from "../controllers/users/delete_user.js";


export async function usersRoutes(app: FastifyInstance) {
    // --- Rotas Públicas ---
    app.post('/users', register);
    app.post('/sessions', authenticate);    

    app.get('/users', getAllUsers);
    app.get('/users/:id', getUserById);


    // --- Rotas Autenticadas (*) ---
    app.put('/users/:id', { onRequest: [verifyJwt] }, updateUser);
    app.patch('/users/:id', { onRequest: [verifyJwt] }, updateUser);
    app.delete('/users/:id', { onRequest: [verifyJwt] }, deleteUser);
}