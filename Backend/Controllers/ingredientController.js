import openAIService from '../services/aiService.js';

// Función para procesar los ingredientes recibidos y llamarlos desde el servicio.
export const recipeCreator = async (req, res) => {
  try {
    const { ingredients } = req.body; // Obtenemos el texto de ingredientes desde el cuerpo de la solicitud
    const ingredientsRecipe = await openAIService.generateRecipeAI(ingredients); // Llamamos a la función del servicio
    console.log('Receta generada:', ingredientsRecipe); // Log del array para verificar
    res.status(200).json({ recipe: ingredientsRecipe });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al procesar los ingredientes' }); // Manejo de errores
  }
};
