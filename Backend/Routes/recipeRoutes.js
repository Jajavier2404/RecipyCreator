    import express from 'express';
import { handleSaveRecipe } from '../controllers/recipeController.js';
import { verifyToken } from '../Middlewares/authMiddleware.js'; // importa el middleware

const router = express.Router();

router.post('/save',verifyToken, handleSaveRecipe);

export default router;
