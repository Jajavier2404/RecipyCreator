import ButtonSB from "./buttonSB";
import logoImage from "../../assets/logo.png";
import { FaHome, FaBook, FaStar, FaBars, FaTimes,FaLeaf } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SideBar() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    const handleClickHome = async (e) => {
        navigate('/');
    };
    const handleClickResults = async (e) => {
        navigate('/Results');
    };
    const handleClickFavorite = async (e) => {
        navigate('/Favorites');
    };

    const toggleSidebar = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            {/* Toggle Sidebar Button */}
            <button 
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 bg-[#50B88C] text-white p-2 rounded-full shadow-md hover:bg-[#3D9B75] transition-colors duration-300"
            >
                {isVisible ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 bottom-0
                w-72 bg-[#295F4E]
                text-white flex flex-col p-6 shadow-xl z-40
                transform transition-transform duration-300 ease-in-out
                ${isVisible ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Header con logo */}
                <div className="flex flex-col items-center pt-8 pb-6 px-6 border-b border-[#50B88C]/30">
                    <div className="flex items-center gap-3 font-moodcake text-3xl text-white">
                        <FaLeaf className="text-[#F18F01] text-2xl" />
                        <h2 className="bg-gradient-to-r from-[#F18F01] to-[#ffd484] bg-clip-text text-transparent font-bold">Ecorecipe</h2>
                    </div>
                    <p className="text-xs text-gray-300 mt-2 font-light">Tu compañero culinario sostenible</p>
                </div>

                {/* Navegación */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#50B88C]/50">
                    <div className="mb-6 px-2">
                        <h3 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">Navegación principal</h3>
                        <ButtonSB text="Home" icon={<FaHome className="text-xl" />} onClick={handleClickHome} />
                        <ButtonSB text="Recipys" icon={<FaBook className="text-xl"/>} onClick={handleClickResults}/>
                        <ButtonSB text="Favorites" icon={<FaStar className="text-xl"/>} onClick={handleClickFavorite}/>
                    </div>
                </nav>

                <div className="mt-auto pt-6 border-t border-[#50B88C]/50 text-center">
                    <p className="text-[#F18F01] text-sm">© 2025 Recipe App -Javier Gomez </p>
                </div>
            </aside>
        </>
    );
}