// routes/ingredientRoutes.js
import express from 'express';
import { recipeCreator } from '../controllers/ingredientController.js';

const router = express.Router();

router.post('/process', recipeCreator); // 

export default router;
