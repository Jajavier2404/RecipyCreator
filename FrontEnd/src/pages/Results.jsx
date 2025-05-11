import { useState,useEffect } from "react";
import chefcito from "../assets/chefcito.png";
import SideBar from "../components/SideBar/SideBar";
import { useLocation,useNavigate } from "react-router-dom";
export default function Results() {
  // Estado para ejemplo de receta generada por IA
    const location = useLocation();
    const navigate = useNavigate();
    
    // Obtener respuesta de la navegación
    const { respuesta } = location.state || {}; 
    
    // Estado para la receta
    const [recipe, setRecipe] = useState(null);
    
    // Efecto para procesar la respuesta del backend
    useEffect(() => {
        console.log("Respuesta recibida:", respuesta);
        
        // Si hay respuesta del backend, úsala para establecer la receta
        if (respuesta) {
            setRecipe(respuesta.recipe);
        } else {
            // Si no hay respuesta, usar datos de ejemplo
            setRecipe({
                title: "Cargando Porfavor Espere...",
                description: "...",
                ingredients: ["..."],
                instructions: ["..."],
                difficulty: "...",
                time: "... minutos",
                servings: "... personas"
            });
        }
    }, [respuesta]);
    
    // Manejar la búsqueda de otra receta
    const handleNewSearch = () => {
        navigate('/');
    };
    
    // Si no hay receta, mostrar un mensaje de carga
    if (!recipe) {
        return (
            <div className="flex h-screen bg-amber-50 items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-emerald-700">Cargando receta...</p>
                </div>
            </div>
        );
    }
    return (
        <div className="flex h-screen bg-amber-50">
        {/* Barra lateral */}
        <aside className="sticky top-0 h-screen">
            <SideBar />
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-4 md:p-8 bg-gradient-to-br from-amber-100 to-amber-200 overflow-auto">
            <div className="max-w-7xl mx-auto">
            {/* Encabezado */}
            <header className="mb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-2">
                Tu Receta Perfecta
                </h1>
                <p className="text-amber-700 text-lg max-w-2xl mx-auto">
                Nuestra IA ha encontrado la mejor receta para ti basada en tus ingredientes disponibles
                </p>
            </header>

            {/* Contenedor principal de la receta */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Título de la receta */}
                <div className="bg-emerald-700 text-white py-4 px-6">
                <h2 className="text-2xl md:text-3xl font-bold text-center">
                    {recipe.title}
                </h2>
                </div>

                {/* Contenido de la receta - formato flexible para móvil/desktop */}
                <div className="md:flex">
                {/* Columna izquierda - Detalles de la receta */}
                <div className="md:w-2/3 p-6 md:p-8">
                    {/* Descripción */}
                    <div className="mb-6 pb-6 border-b border-amber-100">
                    <h3 className="text-lg font-semibold text-emerald-800 mb-2">Descripción</h3>
                    <p className="text-gray-700">{recipe.description}</p>
                    </div>

                    {/* Etiquetas de información */}
                    <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                        ⏱️ {recipe.time}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                        🍽️ {recipe.servings}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        📊 Dificultad: {recipe.difficulty}
                    </span>
                    </div>

                    {/* Ingredientes */}
                    <div className="mb-6">
                    <h3 className="text-lg font-semibold text-emerald-800 mb-3 flex items-center">
                        <span className="mr-2">🛒</span> Ingredientes
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start">
                            <span className="inline-block bg-amber-200 w-5 h-5 rounded-full mr-2 flex-shrink-0 mt-1"></span>
                            <span>{ingredient}</span>
                        </li>
                        ))}
                    </ul>
                    </div>

                    {/* Instrucciones */}
                    <div>
                    <h3 className="text-lg font-semibold text-emerald-800 mb-3 flex items-center">
                        <span className="mr-2">👨‍🍳</span> Preparación
                    </h3>
                    <ol className="space-y-3">
                        {recipe.instructions.map((step, index) => (
                        <li key={index} className="flex">
                            <span className="bg-emerald-200 w-6 h-6 rounded-full mr-3 flex-shrink-0 flex items-center justify-center font-bold text-emerald-800">
                            {index + 1}
                            </span>
                            <span className="text-gray-700">{step}</span>
                        </li>
                        ))}
                    </ol>
                    </div>
                </div>

                {/* Columna derecha - Chef e imagen */}
                <div className="md:w-1/3 bg-[#FAF0E1] flex flex-col items-center justify-center p-6 relative">
                    {/* Nube de diálogo */}
                    <div className="bg-white rounded-xl p-4 mb-4 shadow-md relative max-w-xs">
                    <p className="text-emerald-800 italic font-medium text-center">
                        "¡Esta es la receta perfecta para ti! La he seleccionado especialmente basándome en tus ingredientes disponibles."
                    </p>
                    {/* Triángulo para la nube de diálogo */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
                    </div>
                    
                    {/* Imagen del chef */}
                    <img
                    src={chefcito}
                    alt="Chef recomendando la receta"
                    className="w-48 h-48 md:w-64 md:h-64 object-contain"
                    />
                    
                    {/* Botones de acción */}
                    <div className="mt-6 w-full space-y-3">
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Imprimir receta
                    </button>
                    <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        Guardar favorito
                    </button>
                    <button onClick={handleNewSearch} className="w-full bg-white border border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Buscar otra receta
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </main>
        </div>
    );
}