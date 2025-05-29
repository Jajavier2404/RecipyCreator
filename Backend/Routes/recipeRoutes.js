    import express from 'express';
import { handleSaveRecipe } from '../controllers/recipeController.js';

const router = express.Router();

router.post('/save', handleSaveRecipe);

export default router;
