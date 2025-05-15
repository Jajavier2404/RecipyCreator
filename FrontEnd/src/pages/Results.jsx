import { useState, useEffect } from "react";
import SideBar from "../components/SideBar/SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  // Obtener respuesta de la navegación
  const { respuesta } = location.state || {};

  // Estado para la receta
  const [recipe, setRecipe] = useState(null);
  // Estado para seguimiento de animaciones
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Efecto para animación de entrada
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Efecto para procesar la respuesta del backend
  useEffect(() => {
    console.log("Respuesta recibida:", respuesta);

    // Si hay respuesta del backend, úsala para establecer la receta
    if (respuesta) {
      setRecipe(respuesta.recipe);
    } else {
      // Si no hay respuesta, usar datos de ejemplo
      setRecipe({
        title: "ARROZ CON HUEVO",
        description:
          "Una receta rápida y sostenible que aprovecha los ingredientes que tienes a mano. Ideal para una comida ligera y nutritiva mientras esperas que la inspiración (o el internet) regrese.",
        ingredients: [
          "1 taza de arroz cocido",
          "1 huevo",
          "1/2 taza de vegetales salteados (pueden ser sobras)",
          "1 cucharada de salsa de soya",
          "1 diente de ajo picado",
          "Aceite de oliva al gusto",
        ],
        instructions: [
          "Calienta un sartén con un poco de aceite de oliva.",
          "Agrega el ajo picado y saltéalo por unos segundos hasta que suelte aroma.",
          "Incorpora los vegetales salteados y remueve por un minuto.",
          "Agrega el arroz cocido y mezcla bien con los vegetales.",
          "Haz un espacio en el centro del sartén y rompe el huevo ahí. Revuelve hasta que esté cocido.",
          "Agrega la salsa de soya y mezcla todo por un par de minutos.",
          "Sirve caliente y disfruta mientras se termina de cargar el mundo.",
        ],
        difficulty: "Fácil",
        time: "10 minutos",
        servings: "1 persona",
      });
    }
  }, [respuesta]);

  // Manejar la búsqueda de otra receta
  const handleNewSearch = () => {
    navigate("/");
  };

  // Si no hay receta, mostrar un mensaje de carga con animación
  if (!recipe) {
    return (
      <div className="flex h-screen bg-[#FFF4E0] items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="w-16 h-16 border-4 border-[#295F4E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-[#295F4E] font-medium">Preparando tu receta perfecta...</p>
          <p className="text-sm text-[#A63D40] mt-2">Estamos cocinando algo especial para ti</p>
        </div>
      </div>
    );
  }

  // Variantes de animación para los elementos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="flex min-h-screen bg-[#FFF4E0] overflow-hidden">
      {/* Barra lateral */}
      <aside className="z-20">
        <SideBar />
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-4 lg:p-8 overflow-auto relative md:ml-0">
        {/* Elementos decorativos en el fondo */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Formas orgánicas flotantes */}
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#50B88C]/20 to-[#50B88C]/5 blur-xl"></div>
          <div className="absolute -bottom-60 -right-60 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tl from-[#F18F01]/15 to-[#F18F01]/5 blur-xl"></div>
          
          {/* Patrón de puntos sutil */}
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle, rgba(80, 184, 140, 0.05) 1px, transparent 1px), radial-gradient(circle, rgba(166, 61, 64, 0.03) 1px, transparent 1px)",
            backgroundSize: "30px 30px, 27px 27px",
            backgroundPosition: "0 0, 15px 15px"
          }}></div>
          
          {/* Emojis de ingredientes con animación */}
          <div className="absolute top-1/4 left-1/5 opacity-10 text-4xl animate-float-slow">🥑</div>
          <div className="absolute top-1/3 right-1/4 opacity-10 text-4xl animate-float-slow-reverse">🍅</div>
          <div className="absolute bottom-1/3 left-1/3 opacity-10 text-4xl animate-float-medium">🥕</div>
          <div className="absolute bottom-1/4 right-1/5 opacity-10 text-4xl animate-float-medium-reverse">🧄</div>
          <div className="absolute top-2/3 left-1/6 opacity-10 text-4xl animate-float-fast">🌶️</div>
        </div>

        <motion.div 
          className="max-w-7xl mx-auto relative z-10 pt-6 pb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Encabezado */}
          <motion.header className="mb-10 text-center" variants={itemVariants}>
            <h1 className="text-4xl md:text-6xl font-bold text-[#295F4E] mb-3 font-moodcake tracking-wide">
              Tu Receta Perfecta
            </h1>
            <p className="text-[#A63D40] text-lg max-w-2xl mx-auto font-medium">
              Nuestra IA ha encontrado la mejor receta para ti basada en tus ingredientes disponibles
            </p>
          </motion.header>

          {/* Nueva estructura de contenido */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Columna izquierda (2/5) - Título e Información */}
            <motion.div className="lg:col-span-2 flex flex-col gap-6" variants={itemVariants}>
              {/* Bloque del título */}
              <motion.div 
                className="bg-gradient-to-br from-[#295F4E] to-[#247a5f] rounded-xl shadow-lg p-6 border border-[#295F4E]/20 transform transition-all duration-300 hover:shadow-xl"
                whileHover={{ scale: 1.01 }}
              >
                <h2 className="text-3xl md:text-4xl text-center text-white mb-0 uppercase font-moodcake tracking-wide">
                  {recipe.title}
                </h2>
              </motion.div>

              {/* Bloque de descripción */}
              <motion.div 
                className="bg-white rounded-xl shadow-md p-6 border border-[#295F4E]/10 transform transition-all duration-300 hover:shadow-lg"
                whileHover={{ scale: 1.01 }}
              >
                <h3 className="text-xl font-bold text-[#295F4E] mb-4 flex items-center">
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Descripción
                </h3>
                <p className="text-gray-700 leading-relaxed">{recipe.description}</p>

                {/* Etiquetas de información */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="bg-[#F18F01]/10 text-[#F18F01] px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {recipe.time}
                  </span>
                  <span className="bg-[#50B88C]/10 text-[#295F4E] px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                    {recipe.servings}
                  </span>
                  <span className="bg-[#A63D40]/10 text-[#A63D40] px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Dificultad: {recipe.difficulty}
                  </span>
                </div>
              </motion.div>

              {/* Bloque de ingredientes */}
              <motion.div 
                className="bg-white rounded-xl shadow-md p-6 border border-[#295F4E]/10 transform transition-all duration-300 hover:shadow-lg"
                whileHover={{ scale: 1.01 }}
              >
                <h3 className="text-xl font-bold text-[#295F4E] mb-4 flex items-center">
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </span>
                  Ingredientes
                </h3>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start group"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="inline-block bg-gradient-to-br from-[#F18F01]/40 to-[#F18F01]/20 w-6 h-6 rounded-full mr-3 flex-shrink-0 mt-1 flex items-center justify-center group-hover:scale-110 transition-transform duration-200"></span>
                      <span className="text-gray-700">{ingredient}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Columna derecha (3/5) - Preparación */}
            <motion.div className="lg:col-span-3 flex flex-col gap-6" variants={itemVariants}>
              {/* Bloque de preparación */}
              <motion.div 
                className="bg-white rounded-xl shadow-md p-8 h-full border border-[#295F4E]/10 relative transform transition-all duration-300 hover:shadow-lg"
                whileHover={{ scale: 1.01 }}
              >
                <h3 className="text-2xl font-bold text-[#295F4E] mb-8 flex items-center">
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </span>
                  Preparación
                </h3>
                <ol className="space-y-5">
                  {recipe.instructions.map((step, index) => (
                    <motion.li 
                      key={index} 
                      className="flex group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="bg-gradient-to-br from-[#50B88C]/40 to-[#50B88C]/20 w-8 h-8 rounded-full mr-4 flex-shrink-0 flex items-center justify-center font-bold text-[#295F4E] group-hover:scale-110 transition-transform duration-200">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 leading-relaxed pt-1">{step}</span>
                    </motion.li>
                  ))}
                </ol>

                {/* Botones de acción flotantes */}
                <div className="absolute top-6 right-6 flex space-x-3">
                  <motion.button 
                    className="bg-gradient-to-r from-[#F18F01] to-[#F18F01]/90 hover:from-[#E08200] hover:to-[#F18F01] text-white p-3 rounded-lg font-medium transition-colors shadow-md flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span className="ml-2">Guardar</span>
                  </motion.button>
                  
                  <motion.button 
                    className="bg-gradient-to-r from-[#295F4E] to-[#295F4E]/90 hover:from-[#256957] hover:to-[#295F4E] text-white p-3 rounded-lg font-medium transition-colors shadow-md flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" />
                    </svg>
                    <span className="ml-2">Imprimir</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Botón de buscar otra receta */}
              <motion.button
                onClick={handleNewSearch}
                className="bg-white hover:bg-[#A63D40]/5 border-2 border-[#A63D40] text-[#A63D40] py-4 px-8 rounded-xl font-medium transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Buscar otra receta
              </motion.button>
              
              {/* Tarjeta de chef con imagen */}
              <motion.div 
                className="bg-gradient-to-br from-[#295F4E]/10 to-[#50B88C]/5 p-4 rounded-xl shadow-md border border-[#295F4E]/10 flex items-center mt-2"
                variants={itemVariants}
              >
                <div className="w-12 h-12 rounded-full bg-[#F18F01]/20 flex items-center justify-center mr-4 text-2xl">
                  👨‍🍳
                </div>
                <div>
                  <h4 className="text-[#295F4E] font-medium">Consejo del Chef</h4>
                  <p className="text-sm text-gray-600">Puedes personalizar esta receta agregando hierbas frescas como cilantro o perejil al final para darle más sabor y color.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Pie de página con créditos */}
          <motion.div 
            className="mt-12 pt-6 border-t border-[#295F4E]/10 text-center text-gray-500 text-sm"
            variants={itemVariants}
          >
            <p>Desarrollado con ❤️ por el equipo de Chefcito | © 2025</p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}