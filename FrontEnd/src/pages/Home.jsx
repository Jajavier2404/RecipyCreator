import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar/SideBar';
import api from '../services/api';
import Chef from '../assets/chefcito.png';
import { FaSearch, FaLeaf, FaClock, FaUtensils } from 'react-icons/fa';
import ButtonSS from '../components/Sesion/buttonSS';
import curry from '../assets/curry.jpg';
import ommelette from '../assets/ommelete.jpg';
import pastaP from '../assets/pastaPrimavera.jpg';
import UserProfile from '../components/Sesion/userProfile';
const Home = () => {
    const navigate = useNavigate();

    // Estados
    const [animated, setAnimated] = useState(false);
    const [ingredients, setIngredients] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [features, setFeatures] = useState([
        {
        icon: <FaLeaf className="text-4xl text-[#50B88C]" />,
        title: 'Recetas Eco-friendly',
        description: 'Opciones de cocina sostenibles que reducen el desperdicio de alimentos',
        },
        {
        icon: <FaUtensils className="text-4xl text-[#F18F01]" />,
        title: 'Faciles de seguir',
        description: 'Instrucciones paso a paso para todos los niveles de cocina.',
        },
        {
        icon: <FaClock className="text-4xl text-[#A63D40]" />,
        title: 'Recetas rápidas',
        description: 'Listo en 30 minutos o menos para las noches de semana ocupadas.',
        },
    ]);
    const [popularRecipes, setPopularRecipes] = useState([
        { name: 'Pasta Primavera', time: '25 min', difficulty: 'Easy', img: pastaP },
        { name: 'Vegetable Curry', time: '35 min', difficulty: 'Medium', img: curry },
        { name: 'Quick Omelette', time: '15 min', difficulty: 'Easy', img: ommelette },
    ]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    // Efecto para la animación inicial
    useEffect(() => {
        setAnimated(true);
        // Comprobar si el usuario está logueado
        const userInfo = localStorage.getItem('userInfo');
        setIsLoggedIn(!!userInfo);
    }, []);

    // Manejadores de eventos
    const handleInputChange = (e) => {
        setIngredients(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log('Ingredientes:', ingredients);
        try {
            const response = await api.post('/api/process', { ingredients });
            const respuesta = response.data;
            console.log('Receta:', respuesta);
            navigate('/results', { state: { respuesta } });
        } catch (error) {
            console.error('Error al enviar los ingredientes:', error);
            setIsLoading(false);
        }
    };

    const handleClickLogin = async (e) => {
        navigate('/login');
    };
    const handleClickSignUp = async (e) => {
        navigate('/signUp');
    };
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Barra lateral responsiva */}
            <aside>
                <SideBar />                
            </aside>

            {/* Contenido principal con fondo mejorado */}
            <main className="flex-1 bg-[#FFF4E0] overflow-y-auto">
                {isLoggedIn&&(
                    <aside className='fixed top-5 right-10 z-50'>
                        <UserProfile />
                    </aside>
                )}
                {!isLoggedIn&&(
                    <aside>
                        <ButtonSS text="Login" onClick={handleClickLogin} />
                        <ButtonSS text="Sign Up" onClick={handleClickSignUp} />
                    </aside>
                )}
                {/* Hero Section - Con más espacio vertical y horizontal */}
                <section className="relative min-h-[98vh] flex items-center justify-center px-8 py-20">
                    
                    {/* Contenido principal del hero - Mayor separación entre elementos */}
                    <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">

                        {/* Texto principal y formulario - Aumentado espaciado */}
                        <div className="flex-1 max-w-xl">
                            <div className="mb-12">
                                <h1 className="text-5xl md:text-[53px] font-bold text-[#295F4E] mb-6">
                                    Convierte ingredientes en manjares
                                </h1>
                                <p className="text-xl text-[#295F4E]/80 leading-relaxed">
                                    ¡Descubre recetas creativas con los ingredientes que ya tienes en casa y reduce el desperdicio de alimentos!
                                </p>
                            </div>

                            {/* Input de búsqueda con más padding y espaciado */}
                            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 border border-[#50B88C]/20">
                                <h2 className="text-[#295F4E] font-semibold mb-6 text-xl">Encuentra recetas con tus ingredientes:</h2>
                                <div className="relative mb-6">
                                    <input
                                        type="text"
                                        placeholder="E.j: tomato, chicken, pasta..."
                                        className="w-full p-5 pl-12 rounded-md border border-gray-300 bg-white text-[#295F4E] placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#50B88C] focus:border-transparent transition-all duration-300 text-lg"
                                        onChange={handleInputChange}
                                        value={ingredients}
                                    />
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                        <FaSearch className="h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#F18F01] hover:bg-[#E08200] text-white font-semibold py-4 px-6 rounded-md transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#A63D40] focus:ring-offset-2 flex items-center justify-center text-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Generando receta...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <FaSearch className="mr-3" /> Buscar receta
                                        </span>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Chef Illustration - Más espacio para la ilustración */}
                        <div className="flex-1 flex flex-col items-center justify-center mt-8 md:mt-0 relative">
                            
                            {/* Nuevo diseño del diálogo - Más moderno y visualmente atractivo */}
                            {/* Globo de texto reposicionado */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 mb-8">
                                <div className="bg-gradient-to-br from-[#F18F01] to-[#E08200] text-white rounded-xl p-6 shadow-lg max-w-sm">
                                    <p className="text-xl leading-relaxed font-[16px]">
                                        ¿Tienes ingredientes? ¡Cocinemos algo increíble! <span className="text-2xl">🍳</span>
                                    </p>
                                    {/* Flecha del globo centrada */}
                                    <div className="absolute -bottom-3 right-1/4 transform -translate-x-1/2 rotate-45 w-6 h-6 bg-[#E08200]"></div>
                                </div>
                            </div>
                            
                            {/* Container circular para el chef - Centrado verticalmente */}
                            <div className="relative bg-white rounded-full p-6 border-8 border-[#50B88C]/20 shadow-xl mt-20">
                                {/* Imagen del chef con efecto mejorado */}
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-[#50B88C]/10 rounded-full blur-md"></div>
                                    <img src={Chef} alt="Chef" className="w-64 md:w-80 h-auto rounded-[100px] relative z-0" />
                                    
                                    {/* Elementos decorativos alrededor del chef */}
                                    <div className="absolute top-1/4 -left-6 w-12 h-12 bg-[#F18F01]/20 rounded-full"></div>
                                    <div className="absolute bottom-1/4 -right-6 w-16 h-16 bg-[#A63D40]/20 rounded-full"></div>
                                    <div className="absolute top-0 right-0 w-8 h-8 bg-[#295F4E]/20 rounded-full"></div>
                                </div>
                            </div>
                            
                            {/* Elementos flotantes decorativos */}
                            <div className="absolute bottom-4 left-4 w-20 h-20 bg-[#F18F01]/10 rounded-full blur-md"></div>
                            <div className="hidden md:block absolute top-1/2 right-4 w-24 h-24 bg-[#50B88C]/10 rounded-full blur-md"></div>
                            
                            {/* Pequeños íconos de comida flotantes */}
                            <div className="absolute top-1/3 left-4 hidden md:block">
                                <div className="relative p-3 bg-white rounded-full shadow-md">
                                    <span className="text-2xl">🥗</span>
                                </div>
                            </div>
                            <div className="absolute bottom-1/3 right-4 hidden md:block">
                                <div className="relative p-3 bg-white rounded-full shadow-md">
                                    <span className="text-2xl">🍲</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section - Mayor espaciado y padding */}
                <section className="py-24 px-8 bg-white shadow-[0_0_3px_0.2px] shadow-[#e5d4b3]">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-[#295F4E] mb-16">Why Ecorecipe?</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-[#FFF4E0] rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                                >
                                    <div className="mb-6 p-6 bg-white rounded-full shadow-inner">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-semibold text-[#295F4E] mb-4">{feature.title}</h3>
                                    <p className="text-lg text-[#295F4E]/80">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Popular Recipes Section - Mayor espaciado y padding */}
                <section className="py-24 px-8 bg-[#FFF4E0]">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-[#295F4E] mb-4">Popular Recipes</h2>
                        <p className="text-center text-xl text-[#295F4E]/80 mb-16 max-w-2xl mx-auto">
                            Explore our most loved recipes that are quick and easy to make
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {popularRecipes.map((recipe, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]"
                                >
                                    <div className="h-52 w-full">
                                        {typeof recipe.img === 'string' && recipe.img.startsWith('bg-') ? (
                                            <div className={`h-full w-full ${recipe.img} flex items-center justify-center`}>
                                                <FaUtensils className="text-6xl text-white/50" />
                                            </div>
                                        ) : (
                                            <img 
                                                src={recipe.img} 
                                                alt={recipe.name} 
                                                className="h-full w-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl font-semibold text-[#295F4E] mb-4">{recipe.name}</h3>
                                        <div className="flex justify-between text-lg text-[#295F4E]/70">
                                            <span className="flex items-center">
                                                <FaClock className="mr-2" /> {recipe.time}
                                            </span>
                                            <span>{recipe.difficulty}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-16">
                            <button
                                onClick={() => navigate('/Results')}
                                className="bg-[#295F4E] hover:bg-[#1d4436] text-white font-semibold py-4 px-10 rounded-md transition-colors duration-300 shadow-md text-lg"
                            >
                                Ver más recetas
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer - Con más espacio */}
                <footer className="bg-[#295F4E] text-white py-12 px-8">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-8 md:mb-0">
                            <h2 className="text-3xl font-bold text-[#F18F01]">Ecorecipe</h2>
                            <p className="text-white/70 mt-2 text-lg">Cook smart, waste less</p>
                        </div>

                        <div className="text-center md:text-right">
                            <p className="text-[#F18F01] text-lg">© 2025 Ecorecipe App - Javier Gomez</p>
                            <p className="text-white/70 text-base mt-2">Transforming ingredients into delicious meals</p>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Home;