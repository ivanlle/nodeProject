import { FastifyRequest, FastifyReply } from 'fastify';
import * as postService from '../services/postService';

interface CreatePostRequestData {
  title: string;
  content: string;
  authorId: number;
}

export const createPost = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = request.body as CreatePostRequestData;
    const post = await postService.createPost(data);
    reply.code(201).send(post);
  } catch (error) {
    reply.status(400).send('Error creating post');
  }
};

export const getPostById = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: number };
    if (id) {
      return reply.status(400).send('Invalid Post ID');
    }

    const post = await postService.getPostById(id);
    if (!post) {
      return reply.status(404).send('Post not found');
    }

    reply.send(post);
  } catch (error) {
    reply.status(400).send('Error fetching post');
  }
};

export const updatePost = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: number };
    if (id) {
      return reply.status(400).send('Invalid Post ID');
    }

    const data = request.body as Partial<CreatePostRequestData>;
    const post = await postService.updatePost(id, data);
    reply.send(post);
  } catch (error) {
    reply.status(400).send('Error updating post');
  }
};

export const deletePost = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: number };
    if (id) {
      return reply.status(400).send('Invalid Post ID');
    }

    await postService.deletePost(id);
    reply.code(204).send();
  } catch (error) {
    reply.status(400).send('Error deleting post');
  }
};