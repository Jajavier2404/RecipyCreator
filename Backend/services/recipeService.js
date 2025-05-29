import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const saveRecipe = async (recipeData, userId) => {
    return await prisma.recipe.create({
        data: {
        ...recipeData,
        ingredients: JSON.stringify(recipeData.ingredients),
        instructions: JSON.stringify(recipeData.instructions),
        userId,
        },
    });
};
