import fastify from 'fastify'
import { userRoutes } from './src/routes/userRoutes'
import { AjvCompiler } from '@fastify/ajv-compiler';

const server = fastify({ 
  logger: true,
  ajv: {
      customOptions: {
          removeAdditional: 'all',
          useDefaults: true,
          coerceTypes: true,
          allErrors: true,
          strict: false,
      },
      plugins: [AjvCompiler],
  },
});

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