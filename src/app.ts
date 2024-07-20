import fastify from 'fastify'
import { userRoutes } from './routes/userRoutes'
import { AjvCompiler } from '@fastify/ajv-compiler';
import { postRoutes } from './routes/postRoutes';
import multipart from '@fastify/multipart';
import uploadRoutes from './routes/uploadRoutes';

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

server.register(multipart);
//routes
server.register(userRoutes);
server.register(postRoutes);
server.register(uploadRoutes);

server.get('/helloWorld', async (request, reply) => {
  return 'Hello world!\n'
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
});