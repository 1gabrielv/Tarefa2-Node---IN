import fastify from "fastify";

import { usersRoutes } from "./http/routes/users.js";
import { postsRoutes } from "./http/routes/posts.js";


export const app = fastify({});

app.get("/", (request, reply) => {
    return {message: "Hello, world!"};
});

app.register(usersRoutes);
app.register(postsRoutes);