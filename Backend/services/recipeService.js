import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const guardarReceta = async (recipeData, userId) => {
    return await prisma.recipe.create({
        data: {
        ...recipeData,
        ingredients: JSON.stringify(recipeData.ingredients),
        instructions: JSON.stringify(recipeData.instructions),
        userId,
        },
    });
};

export const getRecetasUsuario = async (userId) => {
    return await prisma.recipe.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: 'desc' // Las más recientes primero
        },
        select: {
            id: true,
            title: true,
            description: true,
            ingredients: true,
            instructions: true,
            difficulty: true,
            servings: true,
            time: true,
            createdAt: true
        }
    });
};
