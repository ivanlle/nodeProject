import { FastifyRequest, FastifyReply } from 'fastify';
import * as userService from '../services/userService';

interface CreateUserRequestData {
    email: string;
    firstName: string;
    lastName: string;
    dni: string;
    age: number;
}

export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const data = request.body as CreateUserRequestData;
    const user = await userService.createUser(data);
    reply.send(user);
};

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const user = await userService.getUserById(parseInt(id));
    if (user) {
        reply.send(user);
    } else {
        reply.status(404).send({ message: 'User not found' });
    }
};

export const getUsers = async (_request: FastifyRequest, reply: FastifyReply) => {
    const users = await userService.getAllUsers();
    reply.send(users);
};

export const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const data = request.body as Partial<CreateUserRequestData>;
    try {
        const user = await userService.updateUser(parseInt(id), data);
        reply.send(user);
    } catch (error) {
        reply.status(404).send({ message: 'User not found' });
    }
};

export const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    try {
        await userService.deleteUser(parseInt(id));
        reply.send({ message: 'User deleted successfully' });
    } catch (error) {
        reply.status(404).send({ message: 'User not found' });
    }
};