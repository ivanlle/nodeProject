import prisma from '../prisma';

interface UserData {
    email: string;
    firstName: string;
    lastName: string;
    dni: string;
    age: number;
}

export const createUser = async (data: UserData) => {
    return prisma.user.create({
        data
    });
};

export const getUserById = async (id: number) => {
    return prisma.user.findUnique({
        where: { id },
    });
};

export const getAllUsers = async () => {
    return prisma.user.findMany();
};

export const updateUser = async (id: number, data: Partial<UserData>) => {
    return prisma.user.update({
        where: { id },
        data,
    });
};

export const deleteUser = async (id: number) => {
    return prisma.user.delete({
        where: { id },
    });
};