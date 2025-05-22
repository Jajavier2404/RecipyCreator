import { X, Clock, Users, ChefHat, Heart, Star } from "lucide-react";

export default function RecipeModal({ recipe, isOpen, onClose }) {
    if (!isOpen || !recipe) return null;

    // Datos extendidos de la receta para mostrar más detalles
    const extendedRecipeData = {
        1: {
            ingredients: [
                "400g de arroz bomba",
                "1 pollo troceado",
                "200g de judías verdes",
                "200g de garrofón",
                "150g de tomate rallado",
                "Azafrán en hebras",
                "Aceite de oliva virgen extra",
                "Sal y pimentón dulce"
            ],
            instructions: [
                "Calentar el aceite en la paellera y dorar el pollo",
                "Añadir las verduras y rehogar durante 5 minutos",
                "Incorporar el tomate y el pimentón, sofreír 2 minutos",
                "Agregar el arroz y el azafrán, mezclar bien",
                "Verter el caldo caliente y cocer durante 20 minutos",
                "Dejar reposar 5 minutos antes de servir"
            ],
            servings: 6,
            calories: 520,
            rating: 4.8
        },
        2: {
            ingredients: [
                "500g de carne de cerdo al pastor",
                "Tortillas de maíz",
                "1 piña fresca",
                "Cebolla blanca",
                "Cilantro fresco",
                "Limones",
                "Salsa verde",
                "Sal y especias"
            ],
            instructions: [
                "Marinar la carne con especias durante 2 horas",
                "Asar la carne en trompo o plancha",
                "Cortar la piña en cubos pequeños",
                "Calentar las tortillas",
                "Servir la carne con piña, cebolla y cilantro",
                "Acompañar con salsa verde y limón"
            ],
            servings: 4,
            calories: 380,
            rating: 4.9
        },
        3: {
            ingredients: [
                "400g de pasta (espaguetis o fettuccine)",
                "200g de panceta o guanciale",
                "4 huevos grandes",
                "100g de queso parmesano rallado",
                "Pimienta negra recién molida",
                "Sal gruesa",
                "Aceite de oliva"
            ],
            instructions: [
                "Hervir la pasta en agua salada hasta al dente",
                "Freír la panceta hasta que esté crujiente",
                "Batir huevos con queso parmesano",
                "Mezclar la pasta caliente con la panceta",
                "Incorporar la mezcla de huevo fuera del fuego",
                "Servir inmediatamente con pimienta negra"
            ],
            servings: 4,
            calories: 650,
            rating: 4.7
        },
        4: {
            ingredients: [
                "2 tazas de arroz para sushi",
                "200g de salmón fresco",
                "1 aguacate maduro",
                "1 pepino",
                "Algas nori",
                "Vinagre de arroz",
                "Azúcar y sal",
                "Wasabi y jengibre"
            ],
            instructions: [
                "Preparar el arroz con vinagre de sushi",
                "Cortar el salmón en tiras finas",
                "Rebanar el aguacate y pepino",
                "Extender el alga nori sobre la esterilla",
                "Colocar arroz y relleno, enrollar firmemente",
                "Cortar con cuchillo afilado y servir"
            ],
            servings: 3,
            calories: 420,
            rating: 4.6
        },
        5: {
            ingredients: [
                "200g de chocolate negro",
                "150g de mantequilla",
                "200g de azúcar",
                "3 huevos grandes",
                "100g de harina",
                "100g de nueces",
                "1 pizca de sal",
                "Vainilla"
            ],
            instructions: [
                "Derretir chocolate y mantequilla al baño maría",
                "Batir huevos con azúcar hasta blanquear",
                "Incorporar la mezcla de chocolate",
                "Añadir harina tamizada y nueces",
                "Hornear a 180°C durante 25-30 minutos",
                "Dejar enfriar antes de cortar"
            ],
            servings: 8,
            calories: 480,
            rating: 4.9
        },
        6: {
            ingredients: [
                "2 lechugas romanas",
                "100g de queso parmesano",
                "Pan para crutones",
                "Anchoas en aceite",
                "Ajo",
                "Aceite de oliva",
                "Limón",
                "Huevo pasteurizado"
            ],
            instructions: [
                "Lavar y cortar la lechuga romana",
                "Preparar crutones tostados con ajo",
                "Hacer el aderezo con anchoas, ajo y limón",
                "Mezclar la lechuga con el aderezo",
                "Añadir crutones y queso parmesano",
                "Servir inmediatamente"
            ],
            servings: 4,
            calories: 280,
            rating: 4.5
        }
    };

    const recipeDetails = extendedRecipeData[recipe.id] || {
        ingredients: ["Ingredientes no disponibles"],
        instructions: ["Instrucciones no disponibles"],
        servings: 1,
        calories: 0,
        rating: 0
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header del Modal */}
                <div className="relative bg-gradient-to-r from-[#295F4E] to-[#1e4a3b] p-6 text-white">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-300"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    
                    <div className="flex items-center gap-6">
                        <div className="text-8xl">{recipe.image}</div>
                        <div>
                            <h2 className="text-4xl font-bold mb-2">{recipe.title}</h2>
                            <p className="text-white/80 text-lg mb-4">{recipe.description}</p>
                            
                            {/* Stats Row */}
                            <div className="flex gap-6 text-sm">
                                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                                    <Clock className="w-4 h-4" />
                                    {recipe.time}
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                                    <ChefHat className="w-4 h-4" />
                                    {recipe.difficulty}
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                                    <Users className="w-4 h-4" />
                                    {recipeDetails.servings} personas
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                                    <Star className="w-4 h-4 fill-current" />
                                    {recipeDetails.rating}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenido del Modal */}
                <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Ingredientes */}
                        <div>
                            <h3 className="text-2xl font-bold text-[#295F4E] mb-6 flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#F18F01] rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">1</span>
                                </div>
                                Ingredientes
                            </h3>
                            <div className="space-y-3">
                                {recipeDetails.ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-[#FFF4E0] rounded-lg hover:bg-[#FFE4B5] transition-colors duration-200">
                                        <div className="w-2 h-2 bg-[#F18F01] rounded-full"></div>
                                        <span className="text-gray-700">{ingredient}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Instrucciones */}
                        <div>
                            <h3 className="text-2xl font-bold text-[#295F4E] mb-6 flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#F18F01] rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">2</span>
                                </div>
                                Instrucciones
                            </h3>
                            <div className="space-y-4">
                                {recipeDetails.instructions.map((instruction, index) => (
                                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                        <div className="w-8 h-8 bg-gradient-to-r from-[#295F4E] to-[#1e4a3b] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">{instruction}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Información Nutricional */}
                    <div className="mt-8 bg-gradient-to-r from-[#FFF4E0] to-[#FFE4B5] rounded-2xl p-6">
                        <h3 className="text-2xl font-bold text-[#295F4E] mb-4">Información Nutricional</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#F18F01] mb-1">{recipeDetails.calories}</div>
                                <div className="text-sm text-gray-600">Calorías</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#295F4E] mb-1">{recipeDetails.servings}</div>
                                <div className="text-sm text-gray-600">Porciones</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#F18F01] mb-1">{recipe.time}</div>
                                <div className="text-sm text-gray-600">Tiempo</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#295F4E] mb-1">{recipeDetails.rating}</div>
                                <div className="text-sm text-gray-600">Rating</div>
                            </div>
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="mt-8 flex gap-4 justify-center">
                        <button className="flex items-center gap-2 bg-gradient-to-r from-[#295F4E] to-[#1e4a3b] text-white px-6 py-3 rounded-full hover:from-[#F18F01] hover:to-[#e07d01] transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <Heart className="w-5 h-5" />
                            Agregar a Favoritos
                        </button>
                        <button 
                            onClick={onClose}
                            className="px-6 py-3 border-2 border-[#295F4E] text-[#295F4E] rounded-full hover:bg-[#295F4E] hover:text-white transition-all duration-300 transform hover:scale-105"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}