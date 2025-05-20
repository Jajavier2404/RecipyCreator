import { useState, useEffect } from "react";

export default function Fondo() {
	// Estado para la animación de elementos decorativos
	const [animated, setAnimated] = useState(false);

	// Efecto para iniciar animaciones
	useEffect(() => {
		setAnimated(true);
	}, []);
	return (
		<>
			{/* Elementos decorativos en el fondo */}
			<div className="fixed inset-0 pointer-events-none">
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
					className={`absolute bottom-20 left-1/4 w-16 h-1 text-4xl text-[#F18F01] opacity-15 ${
						animated ? "animate-pulse" : ""
					}`}
				>
					🥑
				</div>
				<div
					className={`absolute bottom-40 right-1/9 w-1 h-50 text-4xl text-[#50B88C] opacity-10 ${
						animated ? "animate-pulse" : ""
					}`}
				>
					🧄
				</div>
				<div
					className={`absolute top-1/2 left-1/9 w-16 h-16 text-4xl text-[#A63D40] opacity-15 ${
						animated ? "animate-pulse" : ""
					}`}
				>
					🌶️
				</div>

				{/* Círculos decorativos */}
				<div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#50B88C]/10" />
				<div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#F18F01]/10" />
			</div>
		</>
	);
}
