import SideBar from "../components/SideBar/SideBar";
import api from "../services/api";
import { FaSearch } from 'react-icons/fa'; 
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


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
            <main className="flex-1 bg-gradient-to-br from-amber-100 to-amber-200 p-4 flex justify-center items-center relative overflow-hidden">

                {/* Elementos decorativos en el fondo */}
                <div className="absolute inset-0 pointer-events-none">

                    {/* Patrones de ingredientes que flotan suavemente */}
                    <div className={`absolute top-10 left-10 w-16 h-16 text-4xl opacity-20 ${animated ? 'animate-pulse' : ''}`}>🍅</div>
                    <div className={`absolute top-20 right-20 w-16 h-16 text-4xl opacity-10 ${animated ? 'animate-pulse' : ''}`}>🥕</div>
                    <div className={`absolute bottom-20 left-1/4 w-16 h-16 text-4xl opacity-15 ${animated ? 'animate-pulse' : ''}`}>🥑</div>
                    <div className={`absolute bottom-40 right-1/4 w-16 h-16 text-4xl opacity-10 ${animated ? 'animate-pulse' : ''}`}>🧄</div>
                    <div className={`absolute top-1/3 left-1/3 w-16 h-16 text-4xl opacity-15 ${animated ? 'animate-pulse' : ''}`}>🌶️</div>
                    
                    {/* Patrón sutil de cuadrícula de puntos */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-amber-300/20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle, rgba(79, 145, 120, 0.1) 1px, transparent 1px)',
                            backgroundSize: '30px 30px'
                        }} />
                    </div>
                    
                    {/* Círculos decorativos */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-emerald-500/10" />
                    <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-500/10" />

                </div>
                
                {/* Contenido principal */}
                <div className="max-w-3xl w-full p-6 flex flex-col items-center relative z-10">

                    <h2 className="font-bold text-center text-4xl md:text-5xl text-emerald-800 mb-5 text-shadow">
                        Dime qué ingredientes tienes,
                        <br/> 
                        <span className="inline-block mt-1.5 leading-tight">y te mostraré una receta deliciosa</span> 
                        <span className="inline-block ml-2 mt-6 animate-bounce">👨‍🍳</span>
                    </h2>
                    
                    {/* Input de búsqueda con efecto de brillo */}
                    <form 
                    className="relative w-full max-w-xl mt-6"
                    onSubmit={handleSubmit}>
                        
                        <input
                            type="text"
                            placeholder="Ingresa tus ingredientes..."
                            className="w-full p-4 pl-5 pr-12 rounded-full border-2 border-emerald-600 bg-white text-emerald-900 placeholder-emerald-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                            onChange={handleInputChange}
                            value={rawIngredints}
                            />
                        <button 
                        onClick={handleClickResults}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 transition-colors duration-300 shadow-md">
                            <FaSearch className="text-lg" />
                        </button>

                    </form>
                    
                    {/* Tarjetas de mensajes con efecto de elevación */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

                        <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 border-l-4 border-emerald-500">
                            <h3 className="text-xl font-bold text-emerald-800 mb-3">Menos desperdicio, más sabor</h3>
                            <p className="text-emerald-700">Reduce el desperdicio alimentario cocinando con lo que ya tienes.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 border-l-4 border-emerald-500">
                            <h3 className="text-xl font-bold text-emerald-800 mb-3">Cocina con lo que tienes</h3>
                            <p className="text-emerald-700">¡No más viajes de último minuto al supermercado! Usa los ingredientes que ya tienes en casa.</p>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
