import { FastifyRequest, FastifyReply } from 'fastify';
import * as userService from '../services/userService';

interface CreateUserRequestData {
    email: string;
    firstName: string;
    lastName: string;
    dni: string;
    age: number;
}

const dniPattern = /^\d{8}[A-Z]$/;
const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const namePattern = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;

export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const data = request.body as CreateUserRequestData;

    

    //Validate data 
    if(!dniPattern.test(data.dni)) {
        reply.status(400).send({message: 'Incorrect Dni make sure you meet the standard'});
    }else if(!emailPattern.test(data.email)) {
        reply.status(400).send({message: 'Incorrect email format'});
    }else if(!(typeof data.age === 'number')) {
        reply.status(400).send({message: 'Incorrect age format, you have to send a number.'});
    }else if(!namePattern.test(data.firstName)) {
        reply.status(400).send({message: 'Incorrect firstName, invalid character entered'});
    }else if(!namePattern.test(data.lastName)) {
        reply.status(400).send({message: 'Incorrect lastName, invalid character entered'});
    }else{
        const user = await userService.createUser(data);
        reply.send(user);
    }
    
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
        
        //Validate data 
        if(!data.age && !data.dni && !data.email && !data.firstName && !data.lastName) {
            return reply.status(400).send({message: 'No data'})
        }

        if(data.dni) {
            if(!dniPattern.test(data.dni)){
                reply.status(400).send({message: 'Incorrect Dni make sure you meet the standard'});
            };
        }
        if(data.email) {
            if(!emailPattern.test(data.email)){
                reply.status(400).send({message: 'Incorrect email format'});
            }
        }
        if(data.age) {
            if(!(typeof(data.age) === 'number')) {
                reply.status(400).send({message: 'Incorrect age format, you have to send a number.'});
            }
        }
        if(data.firstName) {
            if(!namePattern.test(data.firstName)) {
                reply.status(400).send({message: 'Incorrect firstName, invalid character entered'});
            }
        }
        if(data.lastName){
            if(!namePattern.test(data.lastName)) {
                reply.status(400).send({message: 'Incorrect lastName, invalid character entered'});
            }
        }

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