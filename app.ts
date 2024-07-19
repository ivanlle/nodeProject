import fastify from 'fastify'
import { userRoutes } from './src/routes/userRoutes'

const server = fastify()

//routes
server.register(userRoutes)

server.get('/helloWorld', async (request, reply) => {
  return 'Hello world!\n'
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})