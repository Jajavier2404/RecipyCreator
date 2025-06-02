    import express from 'express';
import { handleSaveRecipe, handleGetUserRecipes } from '../controllers/recipeController.js';
import { verifyToken } from '../Middlewares/authMiddleware.js'; // importa el middleware

const router = express.Router();

router.post('/save',verifyToken, handleSaveRecipe);
router.get('/favorites', verifyToken, handleGetUserRecipes);

export default router;
