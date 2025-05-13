import { useState, useEffect } from "react";
import chefcito from "../assets/chefcito.png";
import SideBar from "../components/SideBar/SideBar";
import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
	// Estado para ejemplo de receta generada por IA
	const location = useLocation();
	const navigate = useNavigate();

	// Obtener respuesta de la navegación
	const { respuesta } = location.state || {};

	// Estado para la receta
	const [recipe, setRecipe] = useState(null);
	// Estado para la animación de elementos decorativos
	const [animated, setAnimated] = useState(false);

	// Efecto para iniciar animaciones
	useEffect(() => {
		setAnimated(true);
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

	// Si no hay receta, mostrar un mensaje de carga
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
				{/* Elementos decorativos en el fondo */}
				<div className="fixed inset-0 pointer-events-none">
					{/* Patrones de ingredientes que flotan suavemente */}
					<div
						className={`absolute top-10 left-10 w-16 h-16 text-4xl text-[#F18F01] opacity-20 ${
							animated ? "animate-pulse" : ""
						}`}
					>
						🍅
					</div>
					<div
						className={`absolute top-20 right-20 w-16 h-16 text-4xl text-[#50B88C] opacity-10 ${
							animated ? "animate-pulse" : ""
						}`}
					>
						🥕
					</div>
					<div
						className={`absolute bottom-20 left-1/4 w-16 h-16 text-4xl text-[#F18F01] opacity-15 ${
							animated ? "animate-pulse" : ""
						}`}
					>
						🥑
					</div>
					<div
						className={`absolute bottom-40 right-1/4 w-16 h-16 text-4xl text-[#50B88C] opacity-10 ${
							animated ? "animate-pulse" : ""
						}`}
					>
						🧄
					</div>
					<div
						className={`absolute top-1/3 left-1/3 w-16 h-16 text-4xl text-[#A63D40] opacity-15 ${
							animated ? "animate-pulse" : ""
						}`}
					>
						🌶️
					</div>

					{/* Patrón sutil de cuadrícula de puntos */}
					<div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#50B88C]/20">
						<div
							className="absolute inset-0"
							style={{
								backgroundImage:
									"radial-gradient(circle, rgba(80, 184, 140, 0.1) 1px, transparent 1px)",
								backgroundSize: "30px 30px",
							}}
						/>
					</div>

					{/* Círculos decorativos */}
					<div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#50B88C]/10" />
					<div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#F18F01]/10" />
				</div>

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
								<div className="absolute top-6 right-6">
									<button className="bg-[#F18F01] hover:bg-[#E08200] text-white p-2 rounded-lg font-medium transition-colors shadow-md">
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
								<button className="bg-[#295F4E] hover:bg-[#50B88C] text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center shadow-md">
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
									className="bg-white border border-[#A63D40] text-[#A63D40] hover:bg-[#A63D40]/10 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center shadow-md"
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
