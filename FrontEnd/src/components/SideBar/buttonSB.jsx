import { useLocation } from "react-router-dom";

export default function ButtonSB({ text, icon, onClick }) {
    const location = useLocation();
    
    // Determina si el botón debe estar resaltado comparando el texto del botón con la ruta actual
    const isActive =
        (text === "Home" && location.pathname === "/") ||
        (text === "Recipys" && location.pathname.toLowerCase() === "/results") ||
        (text === "Favorites" && location.pathname.toLowerCase() === "/favorites");
    
    // Estilos base para todos los botones
    const baseStyles = "flex items-center justify-start w-full gap-3 rounded-lg px-5 py-3 transition-all duration-300 text-sm font-medium shadow-md";
    
    // Aplica estilo activo o inactivo según corresponda
    const activeStyles = isActive
        ? `${baseStyles} bg-[#50B88C] text-white hover:bg-[#295F4E] hover:to-[#295F4E]`
        : `${baseStyles} bg-[#295F4E]/90 text-white hover:bg-[#50B88C]`;
        
    // Aplicar efecto de brillo en el borde y sombra cuando está activo
    const effectStyles = isActive
        ? "border-l-4 border-[#FFFBF0] shadow-lg shadow-[#50B88C]/30 transform -translate-x-1"
        : "border-l-4 border-transparent hover:border-[#50B88C]/80 hover:shadow-md hover:shadow-[#50B88C]/20 hover:transform hover:-translate-x-1";
    
    return (
        <button 
            onClick={onClick}
            className={`${activeStyles} ${effectStyles} my-2`}
        >
            <span className="text-xl bg-white/20 p-2 rounded-md">{icon}</span>
            <span className="font-semibold text-[17px]">{text}</span>
        </button>
    );
}