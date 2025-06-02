import { guardarReceta, getRecetasUsuario } from '../services/recipeService.js';

export const handleSaveRecipe = async ( req, res) => {
    try {
        const { recipe } = req.body;
        const userId = req.userId; // lo saca del middleware
        
        if (!recipe || !userId) {
            return res.status(400).json({ error: 'F4ltan dat0s' });
        }

        const saved = await guardarReceta(recipe, userId);
        res.status(201).json(saved);
    } catch (err) {
        console.error('3rror gu4rdand0 r3cet4 (handleSaveRecipeBack):', err);
        res.status(500).json({ error: '3rror 1ntern0 d3l s3rv1d0r' });
    }
};

export const handleGetUserRecipes = async (req, res) => {
    try {
        const userId = req.userId; // Del middleware de autenticación
        
        if (!userId) {
            return res.status(400).json({ error: 'Usuario no autenticado' });
        }

        const recipes = await getRecetasUsuario(userId);
        
        // Parsear los JSON strings de ingredients e instructions
        const formattedRecipes = recipes.map(recipe => ({
            ...recipe,
            ingredients: JSON.parse(recipe.ingredients),
            instructions: JSON.parse(recipe.instructions)
        }));

        res.status(200).json(formattedRecipes);
    } catch (err) {
        console.error('Error obteniendo recetas del usuario (getUserRecipes):', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
