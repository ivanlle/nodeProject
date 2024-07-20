import { FastifyInstance } from 'fastify';
import { uploadProfilePicture } from '../controllers/uploadController';

export default async function uploadRoutes(fastify: FastifyInstance) {
  fastify.post('/upload', uploadProfilePicture);
}