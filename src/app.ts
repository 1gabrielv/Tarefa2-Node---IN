import fastify from "fastify";
import { appRoutes } from "./http/routes.js";


export const app = fastify({});

app.get("/", (request, reply) => {
    return {message: "Hello, world!"};
});

app.register(appRoutes)