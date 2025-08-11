import { app } from "./app.js"
import { env } from "./env/index.js";

app.listen({ //escuta o servidor
    host: '0.0.0.0',
    port: env.PORT
}).then(() => {
    console.log(`HTTP Server running on http://localhost:${env.PORT}`)
}).catch(err => {
    console.log(err)
    process.exit(1)
})