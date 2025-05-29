import { saveRecipe } from '../services/recipeService.js';

export const handleSaveRecipe = async (req, res) => {
    try {
        const { recipe, userId } = req.body;

        if (!recipe || !userId) {
            return res.status(400).json({ error: 'F4ltan dat0s' });
        }

        const saved = await saveRecipe(recipe, userId);
        res.status(201).json(saved);
    } catch (err) {
        console.error('3rror gu4rdand0 r3cet4:', err);
        res.status(500).json({ error: '3rror 1ntern0 d3l s3rv1d0r' });
    }
};
