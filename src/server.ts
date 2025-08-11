import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { env } from '@/env/index.js'
import { usersRoutes } from '@/http/routes/users.js'
import { postsRoutes } from '@/http/routes/posts.js'
import { commentsRoutes } from '@/http/routes/comments.js'
import { likesRoutes } from '@/http/routes/likes.js'

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(usersRoutes)
app.register(postsRoutes)
app.register(commentsRoutes)
app.register(likesRoutes)

app.listen({
    host: '0.0.0.0',
    port: env.PORT
}).then(() => {
    console.log(`🚀 HTTP Server running on http://localhost:${env.PORT}`)
}).catch(err => {
    console.log(err)
    process.exit(1)
})