// routes/ingredientRoutes.js
const express = require('express');
const router = express.Router();
const { recipeCreator } = require('../controllers/ingredientController');

router.post('/process', recipeCreator); // 

module.exports = router;
