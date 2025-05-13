import SideBar from "../components/SideBar/SideBar";
import api from "../services/api";
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Chef from '../assets/chefcito.png';

export default function Home() {
    const navigate = useNavigate();

    // Estado para controlar la animación de los elementos decorativos
    const [animated, setAnimated] = useState(false);
    const [rawIngredints, setRawIngredients] = useState('');

    // Activar animaciones después de que el componente se monte
    useEffect(() => {setAnimated(true);}, []);

    // Manejar el cambio en el input de búsqueda
    const handleInputChange = (e) => {
        setRawIngredients(e.target.value);
    };
    const handleClickResults = async (e) => {
        navigate('/Results');
    };

    // Manejar el envío del formulario y muestra por consola los ingredientes dijitados por user
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del formulario
        console.log('Ingredientes:', rawIngredints);
        try{
            const response = await api.post('/api/process', { ingredients: rawIngredints })
            const respuesta = response.data
            console.log('Receta:', respuesta)
            navigate('/results', { state: { respuesta } });
        }
        catch (error) {
            console.error('Error al enviar los ingredientes:', error);
        }
    };


    return (
        <div className="flex h-screen">
            {/* Barra lateral responsiva */}
            <aside>
                <SideBar />
            </aside>

            {/* Contenido principal con fondo mejorado */}
            <main className="flex-1 bg-[#FFF4E0] p-4 flex justify-center items-center relative overflow-hidden">

                {/* Elementos decorativos en el fondo */}
                <div className="absolute inset-0 pointer-events-none">

                    {/* Patrones de ingredientes que flotan suavemente */}
                    <div className={`absolute top-10 left-10 w-16 h-16 text-4xl text-[#F18F01] opacity-20 ${animated ? 'animate-pulse' : ''}`}>🍅</div>
                    <div className={`absolute top-20 right-20 w-16 h-16 text-4xl text-[#50B88C] opacity-10 ${animated ? 'animate-pulse' : ''}`}>🥕</div>
                    <div className={`absolute bottom-20 left-1/4 w-16 h-16 text-4xl text-[#F18F01] opacity-15 ${animated ? 'animate-pulse' : ''}`}>🥑</div>
                    <div className={`absolute bottom-40 right-1/4 w-16 h-16 text-4xl text-[#50B88C] opacity-10 ${animated ? 'animate-pulse' : ''}`}>🧄</div>
                    <div className={`absolute top-1/3 left-1/3 w-16 h-16 text-4xl text-[#A63D40] opacity-15 ${animated ? 'animate-pulse' : ''}`}>🌶️</div>

                    {/* Patrón sutil de cuadrícula de puntos */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#50B88C]/20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle, rgba(80, 184, 140, 0.1) 1px, transparent 1px)',
                            backgroundSize: '30px 30px'
                        }} />
                    </div>

                    {/* Círculos decorativos */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#50B88C]/10" />
                    <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#F18F01]/10" />

                </div>

                {/* Contenido principal */}
                <div className="max-w-3xl w-full p-6 flex flex-row items-center relative z-10">
                    {/* Input de búsqueda con efecto de brillo */}
                        <form
                            className="relative bg-[#FFFBF0] w-full max-w-[390px] shadow-md rounded-md border border-gray-300 flex flex-col items-center p-5"
                            onSubmit={handleSubmit}
                            style={{
                                backgroundImage: 'repeating-linear-gradient(white, white 24px, #ddd 25px)',
                                backgroundPositionY: '-1px'
                            }}
                        >
                        <div className="bg-[#295F4E] text-white w-full py-3 rounded-t-md flex items-center justify-center mb-6">
                            <h2 className="text-[21px] font-moodcake text-center tracking-wider">
                                Tus Ingredientes
                            </h2>
                        </div>
                        <div className="relative w-full mb-5">
                            <input
                                type="text"
                                placeholder="¿Qué tienes en casa?"
                                className="w-full p-3 pl-10 rounded-md border border-gray-400 bg-white text-[#295F4E] placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#50B88C] focus:border-transparent transition-all duration-300"
                                onChange={handleInputChange}
                                value={rawIngredints}
                                style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1rem' }}
                            />
                            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <button
                            onClick={handleClickResults}
                            className="bg-[#F18F01] hover:bg-[#E08200] text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#A63D40] focus:ring-offset-2"
                        >
                            Buscar Recetas
                        </button>
                        {/* Aquí podrías agregar más elementos del formulario si los necesitas */}
                    </form>
                    <div>
                        <img src={Chef} alt="Chef" className="w-1/2 h-auto ml-6 mt-10" />
                        <h2 className="font-moodcake text-center text-4xl md:text-2xl text-[#A63D40] mb-5 text-shadow ml-6">
                            Dime que ingredientes tienes,
                            <br/>
                            y te mostrare una receta deliciosa
                            <br/>                      
                            👨‍🍳
                        </h2>
                    </div>


                </div>
            </main>
        </div>
    );
}