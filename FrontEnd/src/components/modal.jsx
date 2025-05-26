import { X, Clock, Users, ChefHat, Heart, Star, Bookmark, Printer } from "lucide-react";

export default function RecipeModal({ recipe, isOpen, onClose }) {
    if (!isOpen || !recipe) return null;

    // Datos de ejemplo para mostrar el modal
    const mockRecipe = {
        id: 1,
        title: "Paella Valenciana Tradicional",
        image: "🥘",
        description: "Auténtica paella valenciana con pollo, conejo, judías verdes y garrofón, cocinada con el mejor azafrán y siguiendo la receta tradicional de Valencia.",
        time: "45 min",
        difficulty: "Intermedio",
        servings: 6,
        rating: 4.8
    };

    const displayRecipe = recipe || mockRecipe;

    // Datos extendidos de la receta
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
                "Calentar el aceite en la paellera y dorar el pollo troceado hasta que esté bien dorado por todos los lados.",
                "Añadir las judías verdes y el garrofón, rehogar durante 5 minutos removiendo ocasionalmente.",
                "Incorporar el tomate rallado y el pimentón dulce, sofreír durante 2 minutos sin que se queme.",
                "Agregar el arroz bomba y el azafrán disuelto en un poco de caldo caliente, mezclar bien.",
                "Verter el caldo caliente (aproximadamente el doble de volumen que el arroz) y cocer durante 20 minutos a fuego medio.",
                "Dejar reposar la paella durante 5 minutos antes de servir para que termine de absorber los líquidos."
            ]
        }
    };

    const recipeDetails = extendedRecipeData[displayRecipe.id] || {
        ingredients: ["Ingredientes no disponibles"],
        instructions: ["Instrucciones no disponibles"]
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-[#FFF4E0] rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
                
                {/* Header */}
                <div className="relative p-6 border-b border-[#295F4E]/10">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 bg-[#295F4E]/10 hover:bg-[#295F4E]/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                    >
                        <X className="w-5 h-5 text-[#295F4E] group-hover:rotate-90 transition-transform duration-200" />
                    </button>
                    
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#295F4E] mb-2">
                            Detalles de la Receta
                        </h1>
                        <p className="text-[#A63D40] text-sm">
                            Información completa de tu receta favorita
                        </p>
                    </div>
                </div>

                {/* Contenido principal con scroll */}
                <div className="p-6 max-h-[calc(95vh-140px)] overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        {/* Estructura similar a Results - Grid de 2 columnas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Columna izquierda - Título, Descripción e Ingredientes */}
                            <div className="flex flex-col gap-6">

                                {/* Bloque del título */}
                                <div className="bg-[#295F4E] rounded-lg shadow-md p-6 border border-[#295F4E]/20">
                                    <div className="flex items-center justify-center gap-4 mb-2">
                                        <div className="text-4xl">{displayRecipe.image}</div>
                                        <h2 className="text-2xl md:text-3xl text-center text-white font-bold uppercase">
                                            {displayRecipe.title}
                                        </h2>
                                    </div>
                                    
                                    {/* Rating */}
                                    <div className="flex items-center justify-center gap-2 mt-3">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-4 h-4 ${i < Math.floor(displayRecipe.rating) ? 'text-[#F18F01] fill-[#F18F01]' : 'text-white/50'}`} />
                                            ))}
                                        </div>
                                        <span className="text-white/90 font-semibold">{displayRecipe.rating}</span>
                                    </div>
                                </div>

                                {/* Bloque de descripción */}
                                <div className="bg-white rounded-lg shadow-md p-6 border border-[#295F4E]/20">
                                    <h3 className="text-xl font-bold text-[#295F4E] mb-3">
                                        Descripción
                                    </h3>
                                    <p className="text-gray-700 mb-4">{displayRecipe.description}</p>

                                    {/* Etiquetas de información */}
                                    <div className="flex flex-wrap gap-3">
                                        <span className="bg-[#F18F01]/10 text-[#F18F01] px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {displayRecipe.time}
                                        </span>
                                        <span className="bg-[#50B88C]/10 text-[#295F4E] px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            {displayRecipe.servings} personas
                                        </span>
                                        <span className="bg-[#A63D40]/10 text-[#A63D40] px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
                                            <ChefHat className="w-4 h-4" />
                                            {displayRecipe.difficulty}
                                        </span>
                                    </div>
                                </div>

                                {/* Bloque de ingredientes */}
                                <div className="bg-white rounded-lg shadow-md p-6 border border-[#295F4E]/20">
                                    <h3 className="text-xl font-bold text-[#295F4E] mb-3">
                                        Ingredientes
                                    </h3>
                                    <ul className="space-y-3">
                                        {recipeDetails.ingredients.map((ingredient, index) => (
                                            <li key={index} className="flex items-start gap-3 group hover:bg-[#F18F01]/5 p-2 rounded-lg transition-colors duration-200">
                                                <span className="inline-block bg-[#F18F01]/20 w-5 h-5 rounded-full flex-shrink-0 mt-1 group-hover:bg-[#F18F01]/30 transition-colors duration-200"></span>
                                                <span className="text-gray-700">{ingredient}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Columna derecha - Preparación y Botones de acción */}
                            <div className="flex flex-col gap-6">
                                {/* Bloque de preparación */}
                                <div className="bg-white rounded-lg shadow-md p-6 h-full border border-[#295F4E]/20 relative">
                                    <h3 className="text-xl font-bold text-[#295F4E] mb-6">
                                        Preparación
                                    </h3>
                                    
                                    {/* Botón guardar en la esquina superior derecha */}
                                    <div className="absolute top-6 right-6">
                                        <button className="bg-[#F18F01] hover:bg-[#E08200] text-white p-2 rounded-lg font-medium transition-colors shadow-md hover:scale-110 transform duration-200">
                                            <Bookmark className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <ol className="space-y-4">
                                        {recipeDetails.instructions.map((step, index) => (
                                            <li key={index} className="flex gap-4 group hover:bg-[#50B88C]/5 p-3 rounded-lg transition-colors duration-200">
                                                <span className="bg-[#50B88C]/20 w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-[#295F4E] text-sm group-hover:bg-[#50B88C]/30 group-hover:scale-110 transition-all duration-200">
                                                    {index + 1}
                                                </span>
                                                <span className="text-gray-700 leading-relaxed">{step}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>

                                {/* Botones de acción */}
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="bg-[#295F4E] hover:bg-[#50B88C] text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center shadow-md hover:scale-[1.02] transform duration-200">
                                        <Printer className="h-5 w-5 mr-2" />
                                        Imprimir
                                    </button>
                                    <button 
                                        onClick={onClose}
                                        className="bg-white border border-[#A63D40] text-[#A63D40] hover:bg-[#A63D40]/10 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center shadow-md hover:scale-[1.02] transform duration-200"
                                    >
                                        <Heart className="h-5 w-5 mr-2" />
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}