import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Heart } from "lucide-react";
import SideBar from "../components/SideBar/SideBar";
import RecipeModal from "../components/modal"; // Import the modal component

export default function Favorites({ user, recipes }) {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true for demo
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    
    // Modal state
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const defaultUser = {
        initials: 'JA',
        name: 'Juan Antonio',
        gmail: 'juan.antonio@email.com',
    };

    const defaultRecipes = [
        { 
            id: 1, 
            title: 'Paella Valenciana', 
            description: 'Auténtica paella valenciana con mariscos frescos, pollo y azafrán. Una explosión de sabores mediterráneos.',
            image: '🥘',
            difficulty: 'Intermedio',
            time: '45 min'
        },
        { 
            id: 2, 
            title: 'Tacos al Pastor', 
            description: 'Deliciosos tacos mexicanos con carne marinada, piña y salsa verde. Perfecto para cualquier ocasión.',
            image: '🌮',
            difficulty: 'Fácil',
            time: '30 min'
        },
        { 
            id: 3, 
            title: 'Pasta Carbonara', 
            description: 'Cremosa pasta italiana con panceta, huevo y queso parmesano. Un clásico irresistible.',
            image: '🍝',
            difficulty: 'Fácil',
            time: '20 min'
        },
        { 
            id: 4, 
            title: 'Sushi Rolls', 
            description: 'Rolls de sushi frescos con salmón, aguacate y pepino. Arte culinario japonés en tu mesa.',
            image: '🍣',
            difficulty: 'Difícil',
            time: '60 min'
        },
        { 
            id: 5, 
            title: 'Brownie de Chocolate', 
            description: 'Brownies húmedos y ricos en chocolate con nueces. El postre perfecto para los amantes del chocolate.',
            image: '🍫',
            difficulty: 'Fácil',
            time: '40 min'
        },
        { 
            id: 6, 
            title: 'Ensalada César', 
            description: 'Fresca ensalada con lechuga romana, crutones caseros y aderezo césar. Saludable y deliciosa.',
            image: '🥗',
            difficulty: 'Fácil',
            time: '15 min'
        },
    ];

    const currentUser = user || defaultUser;
    const currentRecipes = recipes || defaultRecipes;
    const recipesPerView = 3;
    const maxIndex = Math.max(0, currentRecipes.length - recipesPerView);

    // Modal functions
    const openModal = (recipe) => {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRecipe(null);
    };

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
        setTimeout(() => setIsAnimating(false), 300);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
        setTimeout(() => setIsAnimating(false), 300);
    };

    const goToSlide = (index) => {
        if (isAnimating || index === currentIndex) return;
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 300);
    };

    // Auto-advance carousel
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        setIsLoggedIn(!!userInfo);
        const interval = setInterval(() => {
            if (!isAnimating && !isModalOpen) { // Don't auto-advance when modal is open
                nextSlide();
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [isAnimating, currentIndex, isModalOpen]);

    return (
        <div className="flex h-screen bg-gradient-to-br from-[#FFF4E0] to-[#FFE4B5]">
            
            <aside>
                <SideBar />
            </aside>
            {isLoggedIn ? (
                <main className="flex-1 overflow-y-auto">
                    {/* Enhanced Header */}
                    <header className="bg-gradient-to-r from-[#295F4E] to-[#1e4a3b] p-8 flex items-center gap-6 shadow-2xl relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F18F01] rounded-full translate-y-24 -translate-x-24"></div>
                        </div>
                        
                        <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-500 hover:rotate-12">
                            <span className="text-[#F18F01] text-4xl font-bold">
                                {currentUser.initials}
                            </span>
                        </div>
                        <div className="text-white relative z-10">
                            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                                {currentUser.name}
                            </h1>
                            <p className="text-gray-200 text-lg flex items-center gap-2">
                                <Heart className="w-5 h-5 text-[#F18F01] fill-current" />
                                {currentUser.gmail}
                            </p>
                        </div>
                    </header>

                    {/* Recipe Carousel Section */}
                    <section className="p-8 relative">
                        <div className="text-center mb-12">
                            <h2 className="text-5xl font-bold bg-gradient-to-r from-[#295F4E] to-[#1e4a3b] bg-clip-text text-transparent mb-4">
                                Mis Recetas Favoritas
                            </h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                Descubre tu colección personalizada de recetas favoritas. Cada una cuidadosamente seleccionada para crear momentos especiales.
                            </p>
                        </div>

                        {/* Carousel Container */}
                        <div className="relative max-w-7xl mx-auto">
                            {/* Navigation Buttons */}
                            <button
                                onClick={prevSlide}
                                disabled={isAnimating}
                                className="absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white shadow-2xl rounded-full flex items-center justify-center text-[#295F4E] hover:text-[#F18F01] transition-all duration-300 hover:scale-110 disabled:opacity-50 -translate-x-7"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                            
                            <button
                                onClick={nextSlide}
                                disabled={isAnimating}
                                className="absolute right-[-50px] top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white shadow-2xl rounded-full flex items-center justify-center text-[#295F4E] hover:text-[#F18F01] transition-all duration-300 hover:scale-110 disabled:opacity-50 translate-x-7"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>

                            {/* Carousel Track */}
                            <div className="overflow-hidden rounded-2xl">
                                <div 
                                    className="flex transition-transform duration-500 ease-out"
                                    style={{ 
                                        transform: `translateX(-${currentIndex * (100 / recipesPerView)}%)`,
                                        width: `${currentRecipes.length * (100 / recipesPerView)}%`
                                    }}
                                >
                                    {currentRecipes.map((recipe) => (
                                        <div
                                            key={recipe.id}
                                            className="w-full px-3"
                                        >
                                            <article className="group bg-white rounded-2xl border border-gray-100 overflow-hidden h-full">
                                                {/* Recipe Image/Icon */}
                                                <div className="h-48 bg-gradient-to-br from-[#295F4E] to-[#1e4a3b] flex items-center justify-center relative overflow-hidden">
                                                    <div className="text-8xl transform group-hover:scale-110 transition-transform duration-500">
                                                        {recipe.image}
                                                    </div>
                                                    <div className="absolute top-4 right-4">
                                                        <Heart className="w-6 h-6 text-[#F18F01] fill-current" />
                                                    </div>
                                                </div>
                                                
                                                {/* Recipe Content */}
                                                <div className="p-6">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <h3 className="text-[#295F4E] text-2xl font-bold group-hover:text-[#F18F01] transition-colors duration-300">
                                                            {recipe.title}
                                                        </h3>
                                                    </div>
                                                    
                                                    {/* Recipe meta info */}
                                                    <div className="flex gap-4 mb-4 text-sm">
                                                        <span className="px-3 py-1 bg-[#FFF4E0] text-[#295F4E] rounded-full font-medium">
                                                            {recipe.difficulty}
                                                        </span>
                                                        <span className="px-3 py-1 bg-[#F18F01]/10 text-[#F18F01] rounded-full font-medium">
                                                            {recipe.time}
                                                        </span>
                                                    </div>
                                                    
                                                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                                                        {recipe.description}
                                                    </p>
                                                    
                                                    {/* Action Button */}
                                                    <div className="flex justify-between items-center">
                                                        <button 
                                                            onClick={() => openModal(recipe)}
                                                            className="flex items-center gap-2 bg-gradient-to-r from-[#295F4E] to-[#1e4a3b] text-white px-6 py-3 rounded-full hover:from-[#F18F01] hover:to-[#e07d01] transition-all duration-300 transform hover:scale-105 shadow-lg"
                                                        >
                                                            Ver Receta
                                                            <ArrowRight className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Carousel Indicators */}
                            <div className="flex justify-center gap-3 mt-8">
                                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            index === currentIndex 
                                                ? 'bg-[#F18F01] w-8' 
                                                : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Recipe Modal */}
                    <RecipeModal 
                        recipe={selectedRecipe}
                        isOpen={isModalOpen}
                        onClose={closeModal}
                    />
                </main>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center p-12 bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-md mx-auto">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#295F4E] to-[#1e4a3b] rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-[#295F4E] mb-4">
                            ¡Bienvenido a tus Favoritos!
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Inicia sesión para descubrir y guardar tus recetas favoritas
                        </p>
                        <button className="bg-gradient-to-r from-[#295F4E] to-[#1e4a3b] text-white px-8 py-3 rounded-full hover:from-[#F18F01] hover:to-[#e07d01] transition-all duration-300 transform hover:scale-105">
                            Iniciar Sesión
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}