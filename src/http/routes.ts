// import type { FastifyInstance } from "fastify";
// import { register } from "./controllers/users/register.js";
// import { createPost } from "./controllers/posts/create_post.js";
// import { getAllUsers } from "./controllers/users/get_all_users.js";
// import { getAllPosts } from "./controllers/posts/get_all_post.js";
// import { getUserById } from "./controllers/users/get_user_by_id.js";
// import { getPostsByUser } from "./controllers/posts/get_post_by_user.js";
// import { getPostById } from "./controllers/posts/get_post_by_id.js";
// import { deleteUser } from "./controllers/users/delete_user.js";
// import { deletePost } from "./controllers/posts/delete_post.js";
// import { updateUser } from "./controllers/users/update_user.js";
// import { updatePost } from "./controllers/posts/update_post.js";

// export function appRoutes(app: FastifyInstance){
//     app.post("/users", register)
//     app.get("/users", getAllUsers)
//     app.get("/users/:id", getUserById)
//     app.delete("/users/:id", deleteUser)
//     app.put('/users/:id', updateUser);
//     app.patch('/users/:id', updateUser);

//     app.post("/posts", createPost)
//     app.get("/posts", getAllPosts)
//     app.get("/posts/:id", getPostById)
//     app.get("/posts/user/:userId", getPostsByUser)
//     app.delete('/posts/:id', deletePost);
//     app.put('/posts/:id', updatePost);
//     app.patch('/posts/:id', updatePost);
// }

