// src/routes/userRoutes.ts
import { FastifyInstance } from 'fastify';
import * as userController from '../controllers/userController';

export const userRoutes = async (fastify: FastifyInstance) => {
    fastify.post('/users', userController.createUser);
    fastify.get('/users/:id', userController.getUser);
    fastify.get('/users', userController.getUsers);
    fastify.put('/users/:id', userController.updateUser);
    fastify.delete('/users/:id', userController.deleteUser);
};