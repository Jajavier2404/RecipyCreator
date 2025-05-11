const OpenAI = require('openai'); // CORRECTO en CommonJS

// Clave directamente en el código (solución temporal, no recomendada para producción)
const apiKey = process.env.OPENAI_API_KEY;

const aiIngredients = new OpenAI({
	apiKey: apiKey,
})

// Función que interactúa con OpenAI y procesa los ingredientes
const generateRecipeAI = async (ingredients) => {
  const prompt = `Extrae los ingredientes en formato objeto JSON del siguiente texto: "${ingredients}". y Solo responde de la siguiente manera: 
    title: // Título de la receta IMPORTATE :si no tiene nombre la receta inventa uno atractivo a la vista,
    description: //descripsion de la receta,
    ingredients: [ingrediente1, ingrediente2, ...],
    instructions: [instrucción1, instrucción2, ...],
    difficulty: // dificultad de la receta, 
    time: // tiempo de cocción,
    servings: //numero de personas que alcanza el plato.`; // Creamos un prompt para OpenAI

    try {
        const messages = [
        { role: 'system', content: 'Eres el mejor chef del mundo puedes identificar ingredientes y generar deliciosas recetas exquisitas, te las injenias para poder generar recetas unicas con los ingredientes que te muestren y eres el mejor generando recetas' },
        { role: 'user', content: prompt }, // Aquí pasamos el prompt que hemos creado
        ];
        // Solicitud a la API de OpenAI
        const jsonRegister = await aiIngredients.chat.completions.create({
            model: 'gpt-4o-mini', 
            messages: messages,
            response_format: { type: 'json_object' },  // Formato correcto para OpenAI API más reciente
        });

        // Procesamos la respuesta de OpenAI
        const responseText = jsonRegister.choices[0].message.content;
        const responseJson = JSON.parse(responseText);
        
        return responseJson;  // Devolvemos el JSON procesado
    } catch (error) {
        console.error('Error al procesar los ingredientes con OpenAI:', error);
        throw new Error('No se pudo procesar los ingredientes.');
    }
};

module.exports = {
  generateRecipeAI, // Exportamos la función
};
