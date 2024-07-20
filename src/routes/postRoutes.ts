import { FastifyInstance } from 'fastify';
import * as postController from '../controllers/postController';

export const postRoutes = async (fastify: FastifyInstance) => {
    fastify.post('/posts', postController.createPost);
    fastify.get('/post/:id', postController.getPostById);
    fastify.put('/post/:id', postController.updatePost);
    fastify.delete('/post/:id', postController.deletePost);
};