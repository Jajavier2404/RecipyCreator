import React from "react";
import {
    ChefHat,
    Home,
    Search,
    UtensilsCrossed,
    ArrowLeft,
} from "lucide-react";

const Recipe404Page = () => {
    return (
        <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: "#FFF4E0" }}
        >
        <div className="max-w-md w-full text-center">
            {/* Animated Chef Hat */}
            <div className="mb-8 relative">
            <div className="animate-bounce">
                <ChefHat
                size={120}
                style={{ color: "#295F4E" }}
                className="mx-auto mb-4"
                />
            </div>
            <div className="absolute -top-2 -right-2 animate-ping">
                <div
                className="w-4 h-4 rounded-full opacity-75"
                style={{ backgroundColor: "#F18F01" }}
                ></div>
            </div>
            </div>

            {/* Error Message */}
            <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4" style={{ color: "#F18F01" }}>
                404
            </h1>
            <h2
                className="text-2xl font-semibold mb-2"
                style={{ color: "#295F4E" }}
            >
                ¡Receta no encontrada!
            </h2>
            <p className="text-lg mb-6" style={{ color: "#295F4E" }}>
                Parece que esta receta se quemó en el horno...
                <br />
                ¡Pero no te preocupes, tenemos muchas más deliciosas!
            </p>
            </div>

            {/* Decorative Elements */}
            <div className="mb-8 flex justify-center space-x-4">
            <UtensilsCrossed
                size={32}
                style={{ color: "#F18F01" }}
                className="animate-pulse"
            />
            <div
                className="w-2 h-8 rounded-full animate-pulse"
                style={{ backgroundColor: "#295F4E" }}
            ></div>
            <UtensilsCrossed
                size={32}
                style={{ color: "#F18F01",animationDelay: "0.5s"  }}
                className="animate-pulse"
            />
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
            <button
                className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                style={{ backgroundColor: "#295F4E" }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e4538")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#295F4E")}
                onClick={() => window.history.back()}
            >
                <ArrowLeft size={20} />
                <span>Volver atrás</span>
            </button>

            <button
                className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                style={{
                backgroundColor: "#F18F01",
                color: "#FFF4E0",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#d17a01")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#F18F01")}
                onClick={() => (window.location.href = "/")}
            >
                <Home size={20} />
                <span>Ir al inicio</span>
            </button>

            <button
                className="w-full py-3 px-6 rounded-lg font-semibold border-2 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                style={{
                borderColor: "#295F4E",
                color: "#295F4E",
                backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#295F4E";
                e.target.style.color = "#FFF4E0";
                }}
                onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#295F4E";
                }}
                onClick={() => (window.location.href = "/buscar")}
            >
                <Search size={20} />
                <span>Buscar recetas</span>
            </button>
            </div>

            {/* Fun Message */}
            <div
            className="mt-8 p-4 rounded-lg"
            style={{ backgroundColor: "#295F4E" }}
            >
            <p className="text-sm" style={{ color: "#FFF4E0" }}>
                💡 <strong>Consejo del chef:</strong> Mientras buscas la receta
                perfecta, ¿qué tal si explores nuestras recetas más populares?
            </p>
            </div>

            {/* Floating Animation Elements */}
            <div
            className="absolute top-10 left-10 animate-bounce"
            style={{ animationDelay: "1s" }}
            >
            <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#F18F01" }}
            ></div>
            </div>
            <div
            className="absolute bottom-20 right-10 animate-bounce"
            style={{ animationDelay: "2s" }}
            >
            <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#295F4E" }}
            ></div>
            </div>
        </div>
        </div>
    );
};

export default Recipe404Page;
