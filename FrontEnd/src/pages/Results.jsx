import { useState, useEffect } from "react";
import Fondo from "../components/fondo";
import SideBar from "../components/SideBar/SideBar";
import api from "../services/api";

import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
	const location = useLocation();
    const navigate = useNavigate();

    const { respuesta } = location.state || {};

    const [recipe, setRecipe] = useState(null);
    const [animated, setAnimated] = useState(false);

    // No necesitas guardar el userId en el estado local del componente para enviarlo,
    // ya que el backend lo extraerá del token.
    // Sin embargo, si quieres mostrar el ID del usuario en el frontend o usarlo para lógica
    // adicional, podrías obtenerlo aquí.
    const [currentUserId, setCurrentUserId] = useState(null); // Nuevo estado para el userId del usuario logueado

    useEffect(() => {
        setAnimated(true);
        // Al cargar el componente, intentar obtener el userId del localStorage
        const userInfoString = localStorage.getItem('userInfo');
        if (userInfoString) {
            try {
                const userInfo = JSON.parse(userInfoString);
                setCurrentUserId(userInfo.id); // Guardar el ID del usuario
				console.log("User ID obtenido del localStorage:", userInfo);
            } catch (e) {
                console.error("Error parsing userInfo from localStorage", e);
            }
        }
    }, []);

    useEffect(() => {
        console.log("Respuesta recibida:", respuesta);

        if (respuesta) {
            setRecipe(respuesta.recipe);
        } else {
            const defaultRecipe = {
                title: "---",
                description: "---",
                ingredients: ["---"],
                instructions: ["---"],
                difficulty: "---",
                time: "---",
                servings: "---",
            };
            setRecipe(defaultRecipe);
        }
    }, [respuesta]);

    const handleNewSearch = () => {
        navigate("/");
    };

    const handleSaveRecipe = async () => { 
        // Asegúrate de que haya una receta para guardar y un userId disponible
        if (!recipe) {
            alert("No hay una receta para guardar.");
            return;
        }

        // Si currentUserId es nulo, significa que el usuario no está logueado o el ID no se pudo obtener
        if (!currentUserId) {
            alert("Debes iniciar sesión para guardar recetas.");
            navigate("/login"); // Redirige al login si no hay usuario
            return;
        }

        console.log("Receta a enviar al Back:", recipe); // Solo necesitas enviar el objeto 'recipe'

        try {
            // El userId no se envía directamente en el body.
            // Tu backend lo extraerá del token que se envía automáticamente por el interceptor de Axios.
            const response = await api.post("/api/recipe/save", { recipe });
            console.log("Receta guardada exitosamente:", response.data);
            alert("Receta guardada exitosamente!");
        } catch (err) {
            console.error("Error guardando receta:", err.response ? err.response.data : err.message);
            // Mostrar un mensaje de error más específico al usuario
            if (err.response && err.response.status === 401) {
                alert("Necesitas iniciar sesión para guardar recetas. Redirigiendo al login.");
                navigate("/login");
            } else if (err.response && err.response.data && err.response.data.error) {
                alert("Error al guardar receta: " + err.response.data.error);
            } else {
                alert("Error interno al guardar la receta. Por favor, inténtalo de nuevo.");
            }
        }
    };

    if (!recipe) {
        return (
            <div className="flex h-screen bg-[#FFF4E0] items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-[#295F4E]">Cargando receta...</p>
                </div>
            </div>
        );
    }

	return (
		<div className="flex min-h-screen bg-[#FFF4E0]">
			{/* Barra lateral */}
			<aside>
				<SideBar />
			</aside>

			{/* Contenido principal */}
			<main className="flex-1 p-4 md:p-8 overflow-auto relative md:ml-0">
				<Fondo />

				<div className="max-w-7xl mx-auto relative z-10 pt-12 md:pt-0">
					{/* Encabezado */}
					<header className="mb-8 text-center">
						<h1 className="text-4xl md:text-5xl font-bold text-[#295F4E] mb-2 font-moodcake" >
							Tu Receta Perfecta
						</h1>
						<p className="text-[#A63D40] text-[15px] max-w-2xl mx-auto">
							Nuestra IA ha encontrado la mejor receta para ti basada en tus
							ingredientes disponibles
						</p>
					</header>

					{/* Nueva estructura según el sketch */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
						{/* Columna izquierda - Título, Descripción e Ingredientes */}
						<div className="flex flex-col gap-6">

							{/* Bloque del título */}
							<div className="bg-[#295F4E] rounded-lg shadow-md p-6 border border-[#295F4E]/20 font-moodcake">
								<h2 className="text-3xl  text-center text-white mb-2 uppercase text-[25px]">
									{recipe.title}
								</h2>
							</div>

							{/* Bloque de descripción */}
							<div className="bg-white rounded-lg shadow-md p-6 border border-[#295F4E]/20">
								<h3 className="text-xl font-bold text-[#295F4E] mb-3">
									Descripción
								</h3>
								<p className="text-gray-700">{recipe.description}</p>

								{/* Etiquetas de información */}
								<div className="flex flex-wrap gap-3 mt-4">
									<span className="bg-[#F18F01]/10 text-[#F18F01] px-3 py-1 rounded-[8px] text-sm font-medium">
										⏱️ {recipe.time}
									</span>
									<span className="bg-[#50B88C]/10 text-[#295F4E] px-3 py-1 rounded-[8px] text-sm font-medium">
										🍽️ {recipe.servings}
									</span>
									<span className="bg-[#A63D40]/10 text-[#A63D40] px-3 py-1 rounded-[8px] text-sm font-medium">
										📊 Dificultad: {recipe.difficulty}
									</span>
								</div>
							</div>

							{/* Bloque de ingredientes */}
							<div className="bg-white rounded-lg shadow-md p-6 border border-[#295F4E]/20">
								<h3 className="text-xl font-bold text-[#295F4E] mb-3">
									Ingredientes
								</h3>
								<ul className="space-y-2">
									{recipe.ingredients.map((ingredient, index) => (
										<li key={index} className="flex items-start">
											<span className="inline-block bg-[#F18F01]/20 w-5 h-5 rounded-full mr-2 flex-shrink-0 mt-1"></span>
											<span>{ingredient}</span>
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Columna derecha - Preparación y Botones de acción */}
						<div className="flex flex-col gap-6">
							{/* Bloque de preparación */}
							<div className="bg-white rounded-lg shadow-md p-6 h-full border border-[#295F4E]/20 relative">
								<h3 className="text-xl font-bold text-[#295F4E] mb-8 mt-7 ">
									Preparación
								</h3>
								<ol className="space-y-3">
									{recipe.instructions.map((step, index) => (
										<li key={index} className="flex">
											<span className="bg-[#50B88C]/20 w-6 h-6 rounded-full mr-3 flex-shrink-0 flex items-center justify-center font-bold text-[#295F4E]">
												{index + 1}
											</span>
											<span className="text-gray-700">{step}</span>
										</li>
									))}
								</ol>

								{/* Botón guardar en la esquina superior derecha */}
								<div 
									className="absolute top-6 right-6">
									<button 
										onClick={handleSaveRecipe}
										className="cursor-pointer bg-[#F18F01] hover:bg-[#E08200] text-white p-2 rounded-lg font-medium transition-colors shadow-md">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
											/>
										</svg>
									</button>
								</div>
							</div>

							{/* Botones de acción */}
							<div className="grid grid-cols-2 gap-4">
								<button className="cursor-pointer bg-[#295F4E] hover:bg-[#50B88C] text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center shadow-md">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 mr-2"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
										/>
									</svg>
									Imprimir
								</button>
								<button
									onClick={handleNewSearch}
									className="bg-white border cursor-pointer border-[#A63D40] text-[#A63D40] hover:bg-[#A63D40]/10 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center shadow-md"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 mr-2"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
										/>
									</svg>
									Buscar otra receta
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}