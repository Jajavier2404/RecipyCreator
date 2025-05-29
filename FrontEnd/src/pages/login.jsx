import React, { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaArrowLeft } from "react-icons/fa";
import api from "../services/api";
import chefImage from "../assets/chefcito.png";
import Fondo from "../components/fondo";

const Login = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});

	const [isLoading, setIsLoading] = useState(false);

	const [error, setError] = useState("");

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");
		try {
			const response = await api.post("/api/auth/login", formData);
            const { user, token } = response.data; // <--- Desestructurar `user` y `token` de la respuesta del backend

            // Guardar la información del usuario y el TOKEN real en localStorage
            localStorage.setItem('userInfo', JSON.stringify(user));
			console.log("User info saved:", user);
            localStorage.setItem('token', token); // <--- ¡GUARDAR EL TOKEN REAL!

            console.log("Login successful:", response.data);
            navigate("/");
		} catch (err) {
			console.error("Login error:", err);
			setError("Invalid email or password. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleLogin = () => {
		// Implement Google login
		console.log("Google login clicked");
	};
	// Estado para la animación de elementos decorativos
	const [animated, setAnimated] = useState(false);

	// Efecto para iniciar animaciones
	useEffect(() => {
		setAnimated(true);
	}, []);
	return (
		<div className="min-h-screen flex bg-[#FFF4E0] relative overflow-hidden">
			<Fondo />
			<div className="container mx-auto flex items-center justify-center min-h-screen px-4 py-8 relative z-10">
				<div className="w-full max-w-5xl flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
					{/* Left section - Illustration */}
					<div className="w-full lg:w-1/2 p-8 lg:p-12 bg-[#FFF4E0] flex flex-col justify-center items-center relative">
						<div className="absolute top-0 left-0 p-4">
							<button
								onClick={() => navigate("/")}
								className="flex items-center text-[#295F4E] cursor-pointer hover:text-[#50B88C] transition-colors"
							>
								<FaArrowLeft className="mr-2" /> Regresar a Home
							</button>
						</div>

						<h2 className="text-3xl font-bold text-[#295F4E] mb-4 text-center mt-8">
							Ecorecipe
						</h2>
						<p className="text-[#295F4E]/80 text-center mb-8">Cocina mejor, desperdicia menos.</p>

						<div className="relative w-64 h-64 mb-8">
							<div className="absolute inset-0 bg-white rounded-full p-6 border-8 border-[#50B88C]/20 shadow-xl flex items-center justify-center">
								<div className="absolute -inset-4 bg-[#50B88C]/10 rounded-full blur-md"></div>
								<img
									src={chefImage}
									alt="Chef"
									className="w-48 h-auto rounded-[100px] relative z-0"
								/>
							</div>

							{/* Decorative elements */}
							<div className="absolute top-1/4 -left-6 w-12 h-12 bg-[#F18F01]/20 rounded-full"></div>
							<div className="absolute bottom-1/4 -right-6 w-16 h-16 bg-[#A63D40]/20 rounded-full"></div>
						</div>

						<p className="text-[#295F4E] text-center max-w-xs">
							¡Bienvenido de nuevo! Inicia sesión para descubrir recetas
							personalizadas con los ingredientes que ya tienes.
						</p>
					</div>

					{/* Seccion Derecha - Login form */}
					<div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
						<div className="mb-8 text-center">
							<h1 className="text-3xl font-bold text-[#295F4E]">
								Bienvenido de Vuelta
							</h1>
						</div>

						{/* Google login button */}
						<button
							onClick={handleGoogleLogin}
							className="flex items-center justify-center cursor-pointer gap-3 w-full bg-white text-gray-700 font-medium py-3 px-4 border border-gray-300 rounded-lg mb-6 shadow-sm hover:shadow-md transition-all"
						>
							<FaGoogle className="text-[#F18F01]" />
							Inicia Sesion con Google
						</button>

						<div className="flex items-center my-6">
							<hr className="flex-1 border-gray-300" />
							<span className="px-4 text-gray-500 text-sm">O INICIA SESION CON EMAIL</span>
							<hr className="flex-1 border-gray-300" />
						</div>

						{error && (
							<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
								{error}
							</div>
						)}

						<form onSubmit={handleSubmit}>
							<div className="mb-6">
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#50B88C] focus:border-transparent transition-all"
									placeholder="your@email.com"
									required
								/>
							</div>

							<div className="mb-6">
								<div className="flex justify-between mb-2">
									<label
										htmlFor="password"
										className="block text-sm font-medium text-gray-700"
									>
										Contraseña
									</label>
								</div>
								<input
									type="password"
									id="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#50B88C] focus:border-transparent transition-all"
									placeholder="••••••••"
									required
								/>
							</div>

							<div className="flex items-center mb-6">
								<input
									type="checkbox"
									id="rememberMe"
									name="rememberMe"
									checked={formData.rememberMe}
									onChange={handleChange}
									className="h-4 w-4 text-[#50B88C] border-gray-300 rounded focus:ring-[#50B88C]"
								/>
								<label
									htmlFor="rememberMe"
									className="ml-2 block text-sm text-gray-700"
								>
									Mantener Sesion Iniciada
								</label>
							</div>

							<button
								type="submit"
								disabled={isLoading}
								className="w-full bg-[#F18F01] hover:bg-[#E08200] text-white font-semibold py-4 px-6 rounded-lg cursor-pointer transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#A63D40] focus:ring-offset-2"
							>
								{isLoading ? (
									<span className="flex items-center justify-center">
										<svg
											className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Iniciando Sesion...
									</span>
								) : (
									"Iniciar Sesion"
								)}
							</button>
						</form>

						<div className="mt-8 text-center">
							<p className="text-gray-700">
								Necesitas Ayuda?{" "}
								<span className="text-[#F18F01]">Contacta a Soporte</span>
							</p>
							<p className="mt-4 text-gray-700">
								No tienes Cuenta?{" "}
								<Link
									to="/signup"
									className="text-[#F18F01] font-medium hover:text-[#E08200]"
								>
									Registrate
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
