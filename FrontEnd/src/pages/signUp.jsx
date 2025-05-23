import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaArrowLeft, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import api from "../services/api";
import chefImage from "../assets/chefcito.png";
import Fondo from "../components/fondo";

const SignUp = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors({
				...errors,
				[name]: "",
			});
		}
	};

	//validacion de que todos los campos esten correctamente dijitados
	const validateForm = () => {
		const newErrors = {};

		// Validate based on current step
		if (step === 1) {
			if (!formData.name.trim()) {
				newErrors.name = "Full name is required";
			}

			if (!formData.email.trim()) {
				newErrors.email = "Email is required";
			} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
				newErrors.email = "Email is invalid";
			}
		} else if (step === 2) {
			if (!formData.password) {
				newErrors.password = "Password is required";
			} else if (formData.password.length < 8) {
				newErrors.password = "Password must be at least 8 characters";
			}

			if (!formData.confirmPassword) {
				newErrors.confirmPassword = "Please confirm your password";
			} else if (formData.password !== formData.confirmPassword) {
				newErrors.confirmPassword = "Passwords do not match";
			}

			if (!formData.agreeTerms) {
				newErrors.agreeTerms = "You must agree to the terms and conditions";
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const nextStep = () => {
		if (validateForm()) {
			setStep(2);
		}
	};

	const prevStep = () => {
		setStep(step - 1);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);

		try {
			const response = await api.post("/api/auth/signup", formData);
			console.log("Registration successful:", response.data);
			// Redirect to login or dashboard
			navigate("/login");
		} catch (err) {
			console.error("Registration error:", err);
			setErrors({
				submit: "Registration failed. Please try again later.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignUp = () => {
		// Implement Google sign up
		console.log("Google sign up clicked");
	};


	return (
		<div className="min-h-screen flex bg-[#FFF4E0] relative overflow-hidden">
			<Fondo />
			<div className="container mx-auto flex items-center justify-center min-h-screen px-4 py-8 relative z-10">
				<div className="w-full max-w-5xl flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
					{/* Left section - Illustration for wider screens */}
					<div className="hidden lg:flex lg:w-1/2 p-12 bg-[#FFF4E0] flex-col justify-center items-center relative">
						<div className="absolute top-0 left-0 p-4">
							<button
								onClick={() => navigate("/")}
								className="flex items-center text-[#295F4E] hover:text-[#50B88C] cursor-pointer transition-colors"
							>
								<FaArrowLeft className="mr-2" /> Regresar a Inicio
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
							¡Únete a nuestra comunidad! Regístrate para descubrir nuevas recetas y
							reducir el desperdicio de alimentos.
						</p>
					</div>

					{/* Back button for mobile */}
					<div className="lg:hidden p-4">
						<button
							onClick={() => navigate("/")}
							className="flex items-center text-[#295F4E] cursor-pointer hover:text-[#50B88C] transition-colors"
						>
							<FaArrowLeft className="mr-2" /> Regresar a Inicio
						</button>
					</div>

					{/* Right section - Sign Up form */}
					<div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
						<div className="mb-8 text-center">
							<h1 className="text-3xl font-bold text-[#295F4E]">
								Crea tu Cuenta
							</h1>
							<p className="text-gray-600 mt-2">
								Únete a nuestra comunidad de cocineros conscientes del medio ambiente.
							</p>
						</div>

						{/* Progress indicator */}
						<div className="flex justify-center mb-8">
							<div className="flex items-center w-full max-w-xs">
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center ${
										step >= 1
											? "bg-[#F18F01] text-white"
											: "bg-gray-200 text-gray-600"
									}`}
								>
									1
								</div>
								<div
									className={`flex-1 h-1 mx-2 ${
										step >= 2 ? "bg-[#F18F01]" : "bg-gray-200"
									}`}
								></div>
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center ${
										step >= 2
											? "bg-[#F18F01] text-white"
											: "bg-gray-200 text-gray-600"
									}`}
								>
									2
								</div>
							</div>
						</div>

						{errors.submit && (
							<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
								{errors.submit}
							</div>
						)}

						<form
							onSubmit={(e) => {
								e.preventDefault();
								if (step === 2) {
									handleSubmit(e);
								} else {
									nextStep();
								}
							}}
						>
							{step === 1 ? (
								<>
									<div className="mb-6">
										<label
											htmlFor="name"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											Nombre Completo
										</label>
										<div className="relative">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
												<FaUser className="text-gray-400" />
											</div>
											<input
												type="text"
												id="name"
												name="name"
												value={formData.name}
												onChange={handleChange}
												className={`w-full pl-10 p-4 rounded-lg border ${
													errors.name
														? "border-red-500"
														: "border-gray-300"
												} focus:outline-none focus:ring-2 focus:ring-[#50B88C] focus:border-transparent transition-all`}
												placeholder="Tu Nombre"
											/>
										</div>
										{errors.name && (
											<p className="mt-1 text-red-500 text-sm">
												{errors.name}
											</p>
										)}
									</div>

									<div className="mb-6">
										<label
											htmlFor="email"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											Direccion de Correo Electrónico
										</label>
										<div className="relative">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
												<FaEnvelope className="text-gray-400" />
											</div>
											<input
												type="email"
												id="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
												className={`w-full pl-10 p-4 rounded-lg border ${
													errors.email
														? "border-red-500"
														: "border-gray-300"
												} focus:outline-none focus:ring-2 focus:ring-[#50B88C] focus:border-transparent transition-all`}
												placeholder="ejemplo@email.com"
											/>
										</div>
										{errors.email && (
											<p className="mt-1 text-red-500 text-sm">
												{errors.email}
											</p>
										)}
									</div>

									<button
										type="button"
										onClick={nextStep}
										className="w-full bg-[#295F4E] hover:bg-[#4c7a6b] cursor-pointer text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#A63D40] focus:ring-offset-2"
									>
										Continuar
									</button>

									<div className="flex items-center my-6">
										<hr className="flex-1 border-gray-300" />
										<span className="px-4 text-gray-500 text-sm">
											O INICIA SESION CON
										</span>
										<hr className="flex-1 border-gray-300" />
									</div>

									<button
										type="button"
										onClick={handleGoogleSignUp}
										className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-medium py-3 px-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md cursor-pointer  transition-all"
									>
										<FaGoogle className="text-[#295F4E]" />
										Inicia Sesion con Google
									</button>
								</>
							) : (
								<>
									<div className="mb-6">
										<label
											htmlFor="password"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											Contraseña
										</label>
										<div className="relative">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
												<FaLock className="text-gray-400" />
											</div>
											<input
												type="password"
												id="password"
												name="password"
												value={formData.password}
												onChange={handleChange}
												className={`w-full pl-10 p-4 rounded-lg border ${
													errors.password
														? "border-red-500"
														: "border-gray-300"
												} focus:outline-none focus:ring-2 focus:ring-[#50B88C] focus:border-transparent transition-all`}
												placeholder="••••••••"
											/>
										</div>
										{errors.password && (
											<p className="mt-1 text-red-500 text-sm">
												{errors.password}
											</p>
										)}
									</div>

									<div className="mb-6">
										<label
											htmlFor="confirmPassword"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											Confirmar Contraseña
										</label>
										<div className="relative">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
												<FaLock className="text-gray-400" />
											</div>
											<input
												type="password"
												id="confirmPassword"
												name="confirmPassword"
												value={formData.confirmPassword}
												onChange={handleChange}
												className={`w-full pl-10 p-4 rounded-lg border ${
													errors.confirmPassword
														? "border-red-500"
														: "border-gray-300"
												} focus:outline-none focus:ring-2 focus:ring-[#50B88C] focus:border-transparent transition-all`}
												placeholder="••••••••"
											/>
										</div>
										{errors.confirmPassword && (
											<p className="mt-1 text-red-500 text-sm">
												{errors.confirmPassword}
											</p>
										)}
									</div>

									<div className="mb-6">
										<div className="flex items-start">
											<div className="flex items-center h-5">
												<input
													id="agreeTerms"
													name="agreeTerms"
													type="checkbox"
													checked={formData.agreeTerms}
													onChange={handleChange}
													className={`h-4 w-4 text-[#50B88C] border-gray-300 rounded focus:ring-[#50B88C] ${
														errors.agreeTerms ? "border-red-500" : ""
													}`}
												/>
											</div>
											<div className="ml-3 text-[0.9rem]">
												<label
													htmlFor="agreeTerms"
													className="font-medium text-gray-700"
												>
													Estoy de acuerdo con los{" "}
													<a href="#" className="text-[#F18F01]">
														Terminos de Servicio
													</a>{" "}
													and{" "}
													<a href="#" className="text-[#F18F01]">
														Politica de privacidad
													</a>
												</label>
											</div>
										</div>
										{errors.agreeTerms && (
											<p className="mt-1 text-red-500 text-sm">
												{errors.agreeTerms}
											</p>
										)}
									</div>

									<div className="flex gap-4">
										<button
											type="button"
											onClick={prevStep}
											className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 cursor-pointer  rounded-lg transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
										>
											Atras
										</button>

										<button
											type="submit"
											disabled={isLoading}
											className="w-full bg-[#295F4E] hover:bg-[#295F4E] text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 cursor-pointer  shadow-md focus:outline-none focus:ring-2 focus:ring-[#A63D40] focus:ring-offset-2"
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
													Creando Cuenta...
												</span>
											) : (
												"Crear Cuenta"
											)}
										</button>
									</div>
								</>
							)}
						</form>

						<div className="mt-8 text-center">
							<p className="text-gray-700">
								Ya tienes cuenta?{" "}
								<Link
									to="/login"
									className="text-[#295F4E] font-medium hover:text-[#45675c]"
								>
									Iniciar Sesion
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
