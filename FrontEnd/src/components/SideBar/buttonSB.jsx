import { useLocation } from "react-router-dom";
export default function ButtonSB({ text, icon, onClick,}) {
     // Determina si el botón debe estar resaltado comparando el texto del botón con la ruta actual
    const isActive = 
        (text === "Home" && location.pathname === "/") ||
        (text === "Recipys" && location.pathname.toLowerCase() === "/results") ||
        (text === "Favorites" && location.pathname.toLowerCase() === "/favorites");
    
    // Aplica estilo activo solo si corresponde a la ruta actual
    const estilo = isActive 
        ? 'bg-gradient-to-r from-amber-400 to-amber-100 hover:from-amber-300 hover:to-amber-100'
        : 'bg-gradient-to-r from-amber-200 to-amber-100 hover:from-amber-300 hover:to-amber-200';
        
    return (
        <a
            onClick={onClick}
            className={`${estilo}
                flex items-center justify-center md:justify-start gap-3
                w-full font-bold
                py-3 px-4
                rounded-xl
                text-lg 
                text-emerald-800
                transform hover:scale-105
                transition-all duration-300
                shadow-md
                cursor-pointer
            `}
        >
            {icon}
            <span>{text}</span>
        </a>
    );
}