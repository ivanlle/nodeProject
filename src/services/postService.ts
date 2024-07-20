import prisma from '../prisma';

interface PostData {
  title: string;
  content: string;
  authorId: number;
}

export const createPost = async (data: PostData) => {
  return prisma.post.create({
    data,
  });
};

export const getPostById = async (id: number) => {
  return prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });
};

export const updatePost = async (id: number, data: Partial<PostData>) => {
  return prisma.post.update({
    where: { id },
    data,
  });
};

export const deletePost = async (id: number) => {
  return prisma.post.delete({
    where: { id },
  });
};